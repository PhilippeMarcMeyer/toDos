using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace site
{
    /// <summary>
    /// Description résumée de DocumentsFileUpload__
    /// </summary>
    public class DocumentsFileUpload__ : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            System.Diagnostics.Debugger.Launch();

            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpPostedFile file = context.Request.Files[0];
                    string fileName = file.FileName;

                    if (!string.IsNullOrEmpty(fileName))
                    {
                        string Idstr = context.Request.Params["Id"];
                        int Id = int.Parse(Idstr);
                        string Concern = context.Request.Params["Concern"];
                        string Description = context.Request.Params["Description"];
                        if (Description == null) Description = "";
                        int fileId = 0;
                        
                      //  string data64 = context.Request.Params["File"];

                        using (var dbContext = new QuickToDosEntities())
                            {
                                var aFile = new File
                                {
                                    Filename = "temp",
                                    Concern = Concern,
                                    ExtId = Id,
                                    Description = Description
                                };
                                dbContext.Files.Add(aFile);
                                dbContext.SaveChanges();
                                fileId = aFile.Id;
                                if (Concern == "people")
                                {
                                if (fileName == "blob") {
                                    string type = context.Request.Params["Type"];
                                    if(type == "jpeg")
                                        fileName = "image.jpg";
                                    else
                                        fileName = "image."+type;
                                }
                                    aFile.Filename = string.Format("/images/{0}_{1}_{2}", Idstr, fileId, fileName);
                                    dbContext.SaveChanges();

                                    Person aPerson = dbContext.People.Find(Id);

                                    if (aPerson != null)
                                    {
                                        aPerson.Photo = aFile.Filename;
                                        dbContext.SaveChanges();
                                    }
                                }
                                else
                                {
                                    aFile.Filename = string.Format("/documents/{0}/{1}_{2}_{3}", Concern, Idstr, fileId, fileName);
                                    dbContext.SaveChanges();

                                }
                            }
                            string documentsPath = "";
                            if (Concern == "people")
                            {
                                documentsPath = context.Server.MapPath("") + @"\images\";
                            }
                            else
                            {
                                documentsPath = context.Server.MapPath("") + @"\documents\" + Concern + "\\";
                            }

                            System.IO.Directory.CreateDirectory(documentsPath);
                            string fileToSave = documentsPath + string.Format("{0}_{1}_{2}", Idstr, fileId, fileName);


                        file.SaveAs(fileToSave);
                        if (Concern == "people")
                        {
                            const int maxHeight = 450;
                            Image original = Image.FromFile(fileToSave);
                            int originalWidth = original.Width;
                            int originalHeight = original.Height;
                            if(originalHeight > maxHeight)
                            {
                                double factor;
                                factor = (double)maxHeight / originalHeight;
                                int newHeight = maxHeight;
                                int newWidth = (int)(originalWidth*factor);
                                Image thumbnail = original.GetThumbnailImage(newWidth,newHeight, null, IntPtr.Zero);
                                original.Dispose();
                                thumbnail.Save(fileToSave);
                            }
                        }

                    }

                       
                    }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}