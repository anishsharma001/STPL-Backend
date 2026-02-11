import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const account = "storageaccountzampl852f";
const accountKey = "zmuUJCRaIqd9/CPZcFX0DxcQrGCU8johImVJt6EMFUf2DyM4UyGDqAmNvEucq3dF0JLxJHHCU5MT4SIvBAi8QQ==";
const containerName = "suvyavastha";

const sharedKeyCredential = new StorageSharedKeyCredential(
  account,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

export const containerClient =
  blobServiceClient.getContainerClient(containerName);
