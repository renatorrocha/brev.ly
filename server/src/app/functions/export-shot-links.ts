import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";

type ExportShortLinksOutput = {
	reportUrl: string;
};

export async function exportShortLinks(): Promise<ExportShortLinksOutput> {
	const { sql, params } = db
		.select({
			id: schema.short_links.id,
			originalLink: schema.short_links.originalLink,
			shortLink: schema.short_links.shortLink,
			clicks: schema.short_links.clicks,
			createdAt: schema.short_links.createdAt,
		})
		.from(schema.short_links)
		.toSQL();

	const cursor = pg.unsafe(sql, params as string[]).cursor(2);

	const csv = stringify({
		delimiter: ",",
		header: true,
		columns: [
			{ key: "id", header: "ID" },
			{ key: "originalLink", header: "Original Link" },
			{ key: "shortLink", header: "Short Link" },
			{ key: "clicks", header: "Clicks" },
			{ key: "createdAt", header: "Created At" },
		],
	});

	const uploadToStorageStream = new PassThrough();

	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _encoding, callback) {
				for (const chunk of chunks) {
					this.push(chunk);
				}

				callback();
			},
		}),
		csv,
		uploadToStorageStream,
	);

	const uploadToStorage = uploadFileToStorage({
		contentType: "text/csv",
		folder: "downloads",
		fileName: `${new Date().toISOString()}-short-links.csv`,
		contentStream: uploadToStorageStream,
	});

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

	return { reportUrl: url };
}
