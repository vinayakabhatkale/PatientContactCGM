using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace SB2020Listener
{
    class Program
    {
        static void Main(string[] args)
        {
            int port = Convert.ToInt32(ConfigurationManager.AppSettings["DEFAULT_PORT"]);
            string ipListener = ConfigurationManager.AppSettings["DEFAULT_SERVER"].ToString();
            Console.WriteLine(DateTime.Now + " " + "server starting...");
            TcpListener server = new TcpListener(IPAddress.Parse(ipListener), port);
            server.Start();
            Console.WriteLine(DateTime.Now + " " + "server started.");
            Console.WriteLine(DateTime.Now + " " + "starting TCP listener...");

            while (true)
            {
                DataProcessor cw = new DataProcessor(server.AcceptTcpClient());
                Console.WriteLine(DateTime.Now + " " + " new client connected.");
                Console.WriteLine(DateTime.Now + " " + "starting TCP listener...");
                cw.GetAndPushData();
            }
            server.Stop();
            Console.WriteLine(DateTime.Now + " " + " server stop.");
        }

        class DataProcessor
        {
            private Stream ClientStream;
            private TcpClient Client;
            private NetworkStream netStream;
            private string containerkey = ConfigurationManager.AppSettings["containerkey"].ToString();
            private string storageAccount = ConfigurationManager.AppSettings["storageAccount"].ToString();
            private string blobContainerPublicAccessTypeKey = BlobContainerPublicAccessType.Blob.ToString();

            public DataProcessor(TcpClient Client)
            {
                this.Client = Client;
                ClientStream = Client.GetStream();
                netStream = Client.GetStream();
            }

            public void GetAndPushData()
            {
                while (true)
                {
                    byte[] bytes = new byte[Client.ReceiveBufferSize];
                    netStream.Read(bytes, 0, (int)Client.ReceiveBufferSize);
                    string receivedData = Encoding.ASCII.GetString(bytes, 0, Client.ReceiveBufferSize);
                    byte[] strByteArray = Encoding.ASCII.GetBytes(receivedData.TrimEnd('\0'));
                    Guid guid = Guid.NewGuid();
                    AzureBlobStorageProvider _storageProvider = new AzureBlobStorageProvider();
                    var fpath = Task.Run(async () => await _storageProvider.Write(strByteArray, guid.ToString() + ".csv", storageAccount, containerkey, blobContainerPublicAccessTypeKey));
                }
            }
        }
    }
}



