using System;
using System.Collections.Generic;
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

            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpPostedFile file = context.Request.Files[0];
                    string fileName = file.FileName;

                    if (!string.IsNullOrEmpty(fileName))
                    {
                        string Idstr = context.Request.Params["id"];
                        int Id = int.Parse(Idstr);
                        string Concern = context.Request.Params["concern"];
                        string Description = context.Request.Params["description"];
                        if (Description == null) Description = "";
                        int fileId = 0;
                        using (var dbContext = new QuickToDosEntities())
                        {
                            var aFile = new File
                            {
                                Filename = "temp",
                                Concern= Concern,
                                ExtId = Id,
                                Description= Description
                            };
                            dbContext.Files.Add(aFile);
                            dbContext.SaveChanges();
                            fileId = aFile.Id;
                            if (Concern == "people")
                            {
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