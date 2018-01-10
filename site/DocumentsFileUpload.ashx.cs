﻿using System;
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
                        int fileId = 0;
                        using (var dbContext = new QuickToDosEntities())
                        {
                            var aFile = new File
                            {
                                Filename = "temp",
                                Concern= Concern,
                                ExtId = Id
                            };
                            dbContext.Files.Add(aFile);
                            dbContext.SaveChanges();
                            fileId = aFile.Id;
                            aFile.Filename = string.Format("/documents/{0}/{1}_{2}_{3}", Concern, Idstr, fileId, fileName);
                            dbContext.SaveChanges();
                        }

                        string documentsPath = context.Server.MapPath("") + @"\documents\"+ Concern+"\\";
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