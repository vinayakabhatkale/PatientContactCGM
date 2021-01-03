using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace SB2020Listener
{
    public class AzureBlobStorageProvider
    {
        #region Public
        public async Task<string> Write(byte[] fileByteArray, string fileNameWithExtension, string connectionString, string containerName, string blobContainerPublicAccessType)
        {
            CloudBlockBlob blockblob = await GetCloudBlockBlob(fileNameWithExtension, connectionString, containerName, blobContainerPublicAccessType);
            await blockblob.UploadFromByteArrayAsync(fileByteArray, 0, fileByteArray.Length);
            return blockblob.Uri.ToString();
        }

        #endregion

        #region Private
        private async Task<CloudBlockBlob> GetCloudBlockBlob(string fileName, string connectionString, string containerName, string blobContainerPublicAccessType)
        {
            CloudBlobContainer container = await GetCloudContainer(connectionString, containerName, blobContainerPublicAccessType);
            return container.GetBlockBlobReference(fileName);
        }
        private async Task<CloudBlobContainer> GetCloudContainer(string connectionString, string containerName, string blobContainerPublicAccessType)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            BlobContainerPublicAccessType blobContainerPublicAccessTypeKey = (BlobContainerPublicAccessType)Enum.Parse(typeof(BlobContainerPublicAccessType), blobContainerPublicAccessType, true);
            CloudBlobContainer blobContainer = blobClient.GetContainerReference(containerName);
            if (await blobContainer.CreateIfNotExistsAsync())
            {
                await blobContainer.SetPermissionsAsync(
                   new BlobContainerPermissions { PublicAccess = blobContainerPublicAccessTypeKey }
                );
            }
            return blobContainer;
        }
        #endregion
    }
}
