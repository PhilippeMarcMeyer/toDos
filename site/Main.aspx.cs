using site.enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
namespace site
{
    public partial class Main : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }


        [WebMethod]
        public static void DeleteWork(InfoId toDel)
        {
            using (var dbContext = new QuickToDosEntities())
            {
                bool go = true;
                List<Break> results = dbContext.Breaks.Where(x => x.ToDoId == toDel.Id).ToList();
                if (results != null)
                {
                    foreach (Break result in results) {
                        dbContext.Breaks.Remove(result);
                    }

                }

                toDo job = dbContext.toDos.Find(toDel.Id);
                if (job == null)
                {
                    go = false;
                }
                if (go)
                {
                    try
                    {
                        job.DontShow = true;

                        //dbContext.toDos.Remove(job);
                        dbContext.SaveChanges();

                    }
                    catch (Exception e)
                    {

                    }
                }

            }

        }

        [WebMethod]
        public static int TogglePause(InfoId info)
        {
            int jobId = info.Id;
            PauseInfo pauseInfo = new PauseInfo();

            pauseInfo =  DoTogglePause(jobId);
            return pauseInfo.Duration;

        }

    [WebMethod]
        public static int ToggleDone(InfoDone info)
        {
            if (info == null)
            {
                throw new Exception("Echec mise a jour (1)");
            }
            PauseInfo pauseInfo = new PauseInfo();
            int nrMinutes = 0;
            var jobId = info.Id;
            using (var dbContext = new QuickToDosEntities())
            {

                toDo job = dbContext.toDos.Find(jobId);

                if (job == null)
                {
                    throw new Exception("Echec mise a jour (2)");
                }
                if ((bool)info.Done) // We close
                {
                    job.End = DateTime.Now;

                    if (job.Begin == null)
                    {
                        job.Begin = job.End;
                    }
                    else
                    {
                        pauseInfo = DoTogglePause(jobId);
                        nrMinutes = pauseInfo.Duration;
                        if (!pauseInfo.Paused)
                        {
                            pauseInfo = DoTogglePause(jobId);
                            nrMinutes = pauseInfo.Duration;
                        }
                    }
                }
                else // We open again
                {
                    job.End = null;
                }

                job.Done = info.Done;
                job.Duration = nrMinutes;
                dbContext.SaveChanges();
            }

            return nrMinutes;

        }
        [WebMethod]
        

       public static void DeleteImg(InfoId toDel)
        {
            using (var dbContext = new QuickToDosEntities())
            {
                File anImage = dbContext.Files.Find(toDel.Id);
                if (anImage == null)
                {
               
                string filename = anImage.Filename;
                string[] items = filename.Split('/');
                filename = items[items.Length - 1];

                string concern = anImage.Concern;
                //string uploadPath = HttpContext.Current.Server.MapPath("") + @"\documents\" + concern + @"\";
                string uploadPath = ConfigurationManager.AppSettings["RootFolder"]+@"\documents\"+ concern + @"\";
                string UploadPathOldies = uploadPath + @"oldies\";

                string sourceFile = System.IO.Path.Combine(uploadPath, filename);
                string destFile = System.IO.Path.Combine(UploadPathOldies, filename);

                if (!System.IO.Directory.Exists(UploadPathOldies))
                {
                    System.IO.Directory.CreateDirectory(UploadPathOldies);
                }
                System.IO.File.Move(sourceFile, destFile);

                dbContext.Files.Remove(anImage);
                dbContext.SaveChanges();
                }
            }
        }

        [WebMethod]
        public static void DeleteKnowledge(InfoId toDel)
        {
            using (var dbContext = new QuickToDosEntities())
            {
                Knowledge aKnowledge = dbContext.Knowledges.Find(toDel.Id);
                if (aKnowledge == null)
                {
                    throw new Exception("Echec mise a jour");
                }
                dbContext.Knowledges.Remove(aKnowledge);
                dbContext.SaveChanges();
            }
        }

        [WebMethod]
        public static void AddKnowledge(KnowAdd Know)
        {
            if (Know.Id == -1)
            {
                using (var dbContext = new QuickToDosEntities())
                {
                    var aKnowledge = new Knowledge
                    {
                        Subject = Know.Subject,
                        Body = Know.Body,
                        Creation = DateTime.Now
                    };
                    dbContext.Knowledges.Add(aKnowledge);
                    dbContext.SaveChanges();
                }
            }
            else
            {
                using (var dbContext = new QuickToDosEntities())
                {

                    Knowledge aKnowledge = dbContext.Knowledges.Find(Know.Id);

                    if (aKnowledge == null)
                    {
                        throw new Exception("Echec mise a jour");
                    }

                    aKnowledge.Subject = Know.Subject;
                    aKnowledge.Body = Know.Body;
                    aKnowledge.Modification = DateTime.Now;
                    dbContext.SaveChanges();
                }
            }
        }

        [WebMethod]
        public static int AddWork(Data toDo)
        {
            int toDoId;
            DateTime? toDoStart;
            DateTime? toDoEnd;
            toDoId = toDo.Id;

            if (toDo.Id == -1)
            {
                using (var dbContext = new QuickToDosEntities())
                {

                    try
                    {
                        var aJob = new toDo
                        {
                            Description = toDo.Description,
                            Begin = toDo.Begin,
                            End = toDo.End,
                            Duration = toDo.Duration,
                            Reference = toDo.Reference,
                            Done = false,
                            Planned = toDo.Planned,
                            Notes = toDo.Notes,
                            Branch = toDo.Branch,
                            Status = toDo.Appraisal,
                            Status_Note= toDo.AppraisalNote
                        };
                        dbContext.toDos.Add(aJob);
                        dbContext.SaveChanges();

                        toDoId = aJob.Id;
                        toDoStart = aJob.Begin;
                        toDoEnd = aJob.End;
                        var aTimeChunk = new Break
                        {
                            Start = toDoStart,
                            End = toDoEnd,
                            ToDoId = toDoId
                        };

                        dbContext.Breaks.Add(aTimeChunk);
                        dbContext.SaveChanges();
                    }
                        catch (Exception e)
                        {
                           // throw new Exception(String.Format("the error is : {0}", e));
                        }

                }
            }
            else
            {
                using (var dbContext = new QuickToDosEntities())
                {

                    toDo job = dbContext.toDos.Find(toDo.Id);

                        if (job == null)
                        {
                            throw new Exception("Echec mise a jour");
                        }

                        job.Description = toDo.Description;
                        job.Begin = toDo.Begin;
                        job.End = toDo.End;
                        job.Duration = toDo.Duration;
                        job.Reference = toDo.Reference;
                        job.Done = toDo.Done;
                        job.Notes = toDo.Notes;
                        job.Planned = toDo.Planned;
                        job.Branch = toDo.Branch;
                        job.Status = toDo.Appraisal;
                        job.Status_Note = toDo.AppraisalNote;
                    dbContext.SaveChanges();
                }
            }
            return toDoId;
        }
        //searchFor

        [WebMethod]
        public static Work GetSearch(string searchFor)
        {
       
            Work work = GetData(searchFor);
            return work;

        }

        [WebMethod]
        public static Work GetWork()
        {
            Work work = GetData("");
            return work;

        }
       


        [WebMethod]
        public static KnowHow GetKnowledge()
        {
            KnowHow knowledge = new KnowHow()
            {
                caption = "Base de connaissances",
                headers = new string[] { "Id", "Description", "Créée le", "Modifiée le" },
                types = new string[] { "number", "string", "datetime", "datetime" },
                props = new string[] { "Id", "Subject", "Creation", "Modification" }
            };
            
            using (var dbContext = new QuickToDosEntities())
            {
                IQueryable<Knowledge> query = dbContext.Knowledges;
                knowledge.data = query.Select(x => new DataForKnowledge
                {
                    Id = x.Id,
                    Subject = x.Subject,
                    Creation = x.Creation,
                    Modification = x.Modification,
                    Body = x.Body
                }).ToList();
            }

            knowledge.data = knowledge.data.OrderByDescending(x => x.Id).Take(12).ToList();

            return knowledge;

        }

        [WebMethod]
        public static KnowHow GetSearchForKnowledge(string searchFor)
        {
            KnowHow knowledge = new KnowHow()
            {
                caption = "Base de connaissances",
                headers = new string[] { "Id", "Description", "Créée le", "Modifiée le" },
                types = new string[] { "number", "string", "datetime", "datetime" },
                props = new string[] { "Id", "Subject", "Creation", "Modification" }
            };

            using (var dbContext = new QuickToDosEntities())
            {
                IQueryable<Knowledge> query;

                query = dbContext.Knowledges.Where(x => x.Subject.Contains(searchFor));

                knowledge.data = query.Select(x => new DataForKnowledge
                {
                    Id = x.Id,
                    Subject = x.Subject,
                    Creation = x.Creation,
                    Modification = x.Modification,
                    Body = x.Body
                }).ToList();
            }

            knowledge.data = knowledge.data.OrderByDescending(x => x.Id).ToList();

            return knowledge;

        }
        

        public static Work GetData(string searchFor)
        {
            Work work = new Work()
            {
                caption = "Travail en cours",
                headers = new string[] { "Id", "Description", "Début", "Fin", "Référence", "Branche", "Prévu", "Durée", "Fait", "Statut" },
                types = new string[] { "number", "string", "datetime", "datetime", "string", "string", "number", "number", "boolean", "string" },
                props = new string[] { "Id", "Description", "Begin", "End", "Reference", "Branch", "Planned", "Duration", "Done", "Status" },
                appraisal = getStatusList()
            };


            using (var dbContext = new QuickToDosEntities())
            {
                IQueryable<toDo> query;
                if (searchFor.Length == 0)
                {
                    query = dbContext.toDos.Where(x => x.DontShow != true);
                    query = query.OrderByDescending(x => x.Id).Take(12);
                }
                else
                {
                    TimeToken result = GetToken(searchFor);
                    if (result.Token == "none")
                    {

                        query = dbContext.toDos.Where(x => x.DontShow != true && (x.Branch.Contains(searchFor) || x.Notes.Contains(searchFor) || x.Notes.Contains(searchFor) || x.Reference.Contains(searchFor)));
                    }else
                    {
                        //Name = "last week",
                        //Token = "week",
                        //When = -1
                        DateTime start = DateTime.Now;
                        DateTime finish = DateTime.Now;
                        if (result.Token == "day")
                        {
                            start = DateTime.Today.AddDays(result.When);
                            finish = start.AddDays(1).AddSeconds(-1);
                        }
                        else if (result.Token == "week") // to be continued
                        {
                            var day = (int)start.DayOfWeek;
                            if (day == 0) day = 7;
                            var delta = 1 - day + result.When * 7;
                            start = DateTime.Today.AddDays(delta);
                            finish = start.AddDays(7).AddSeconds(-1);
                        }
                        else if (result.Token == "month") // to be continued
                        {
                            var day = start.Day; // day in month
                            var delta = 1 - day;
                            start = DateTime.Today.AddMonths(result.When).AddDays(delta);

                            delta = delta + 6;
                            finish = start.AddMonths(1).AddDays(-1);
                        }


                        query = dbContext.toDos.Where(x => x.DontShow != true && (x.Begin >= start && x.Begin <= finish));
                    }
                }
                work.data = query.Select(x => new DataForList
                {
                    Id = x.Id,
                    Description = x.Description,
                    Begin = x.Begin,
                    End = x.End,
                    Reference = x.Reference,
                    Duration = x.Duration,
                    Done = x.Done,
                    Notes = x.Notes,
                    Planned = x.Planned,
                    Branch = x.Branch == null ? "" : x.Branch,
                    Appraisal = x.Status,
                    AppraisalNote = x.Status_Note == null ? "" : x.Status_Note,
                    TimeChunks = x.Breaks.Where(y => y.ToDoId == x.Id)
                    .Select(y => new TimeChunkInfo
                    {
                        Id = y.Id,
                        Begin = y.Start,
                        End = y.End
                    }).ToList()
                }).ToList();
            }
            foreach (DataForList job in work.data)
            {
                job.Files = getFiles(job.Id,"work");

                if (job.End != null)
                {
                    job.Status = job.Appraisal_Str;
                }
                else
                {
                    var item = job.TimeChunks.FirstOrDefault(i => i.End == null);
                    if (item != null)
                    {
                        job.Status = "En cours";
                    }
                    else
                    {
                        job.Status = "En pause";
                    }

                }

            }

            work.data = work.data.OrderByDescending(x => x.Id).ToList();

            return work;



        }

       

        public static PauseInfo DoTogglePause(int jobId)
        {
            PauseInfo pauseInfo = new PauseInfo();
            pauseInfo.Duration = 0;
            pauseInfo.Paused = false;

            using (var dbContext = new QuickToDosEntities())
            {
                List<Break> timeChunks = dbContext.Breaks.Where(x => x.ToDoId == jobId).ToList();
                if (timeChunks != null)
                {
                    timeChunks = timeChunks.OrderByDescending(x => x.Id).ToList();
                    if (timeChunks[0].End == null)
                    {
                        int Id = timeChunks[0].Id;
                        Break chunk = dbContext.Breaks.Find(Id);
                        if (chunk != null)
                        {
                            chunk.End = DateTime.Now;

                            dbContext.SaveChanges();
                            pauseInfo.Paused = true;
                        }
                    }
                    else
                    {
                        var chunk = new Break
                        {
                            Start = DateTime.Now,
                            ToDoId = jobId
                        };

                        dbContext.Breaks.Add(chunk);
                        dbContext.SaveChanges();

                    }
                }

            }
            pauseInfo.Duration = CalcMinutes(jobId);

            return pauseInfo;
        }

        public static List<File> getFiles(int id,string concern)
        {
            List<File> files = new List<File>();
            using (var dbContext = new QuickToDosEntities())
            {
                files = dbContext.Files.Where(x => x.ExtId == id && x.Concern== concern).ToList();
            }
            return files;
        }

        public static int CalcMinutes(int JobId)
        {
            int nrMinutes = 0;

            using (var dbContext = new QuickToDosEntities())
            {
                List<Break> results = dbContext.Breaks.Where(x => x.ToDoId == JobId).ToList();
                if (results != null)
                {
                    foreach (Break chunk in results)
                    {
                        if (chunk.Start != null && chunk.End != null)
                        {
                            nrMinutes += CalcOneTimeChunk((DateTime)chunk.Start, (DateTime)chunk.End);
                        }

                    }
                }
            }
            return nrMinutes;
        }

        public static int CalcOneTimeChunk(DateTime start, DateTime finish)
        {
            int nrMinutes = 0;

            int startHour = start.Hour;
            int startMinute = start.Minute;

            int finishHour = finish.Hour;
            int finishMinute = finish.Minute;

            TimeSpan span = finish.Subtract(start);
            int NrHours = span.Hours;
            int NrDays = span.Days;
            if (NrHours > 8) NrDays++;

            if (startHour < 9)
            {
                startHour = 9;
                startMinute = 0;
            }
            if (finishHour > 18)
            {
                finishHour = 18;
                finishMinute = 0;
            }

            if (NrDays == 0)
            {
                nrMinutes = (finishHour - startHour) * 60 + (finishMinute - startMinute);
                if (nrMinutes > 480) nrMinutes = 480;
            }
            else
            {
                if (NrDays > 1)
                {
                    nrMinutes = (NrDays - 1) * 480;
                }
                nrMinutes += ((18 - startHour) * 60) + startMinute;
                nrMinutes += ((finishHour - 9) * 60) + finishMinute;
            }

            return nrMinutes > 0 ? nrMinutes : 0; // travail hors horaires
        }


        // inutilisé mais intéressant
        public static void InsertData(string connectionString, DateTime? Start, DateTime? End, int ToDoId)
        {

            string query = "INSERT INTO Breaks (Start, End, ToDoId) " +
                           "VALUES (@Start, @End, @ToDoId) ";

            using (SqlConnection cn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand(query, cn))
            {
                cmd.Parameters.Add("@Start", SqlDbType.DateTime).Value = Start;
                cmd.Parameters.Add("@End", SqlDbType.DateTime).Value = End;
                cmd.Parameters.Add("@ToDoId", System.Data.SqlDbType.Int).Value = ToDoId;

                cn.Open();
                cmd.ExecuteNonQuery();
                cn.Close();
            }
        }

        public static List<EnumValues> getStatusList()
        {
            List<EnumValues> list = new List<EnumValues>();

            foreach (var e in Enum.GetValues(typeof(toDoStatus)))
            {
                list.Add(new EnumValues
                {
                    EnumDisplayName = e.ToString(),
                    EnumValue = (int)e
                });
            }
            return list;
        }
        public static TimeToken GetToken (string SearchString)
        {
            TimeToken token = new TimeToken();
            token.Name = "";
            token.Token = "none";
            token.When = 0;

           List<TimeToken> ReferenceTokens = new List<TimeToken>();
            ReferenceTokens.Add(new TimeToken()
                {
                    Name = "today",
                    Token = "day",
                    When = 0
                }
            );
            ReferenceTokens.Add(new TimeToken()
                {
                    Name = "yesterday",
                    Token = "day",
                    When = -1
                }
            );

            ReferenceTokens.Add(new TimeToken()
                {
                    Name = "this week",
                    Token = "week",
                    When = 0
                }
            );
            ReferenceTokens.Add(new TimeToken()
                {
                    Name = "last week",
                    Token = "week",
                    When = -1
                }
            );
           
            ReferenceTokens.Add(new TimeToken()
            {
                Name = "this month",
                Token = "month",
                When = 0
            }
            );
            ReferenceTokens.Add(new TimeToken()
            {
                Name = "last month",
                Token = "month",
                When = -1
            }
            );


            bool nPeriodsAgo = false;
            string[] items = SearchString.Split(' ');
            if (items.Length == 3)
            {
                int n;
                bool isNumeric = int.TryParse(items[0], out n);
                if (isNumeric)
                {
                    token = new TimeToken()
                    {
                        Name = SearchString,
                        Token = items[1].Replace("s",""), // no plural
                        When = items[2] == "ago" ? -n : n
                    };
                    nPeriodsAgo = true;
                }
            }
            if (!nPeriodsAgo)
            {
                token = ReferenceTokens.Where(i => i.Name == SearchString).FirstOrDefault();
                if (token == null)
                {
                    token = new TimeToken()
                    {
                        Name = "",
                        Token = "none",
                        When = 0
                    };
                }
            }

            return token;
        }


        // inutilisé mais intéressant
        public static string GetConnectionString()
        {
            string connectionString = string.Empty;

            connectionString = ConfigurationManager.ConnectionStrings["connect"].ConnectionString;

            return connectionString;
        }
        public class Work
        {
            public string caption { get; set; }
            public string[] headers { get; set; }
            public string[] types { get; set; }
            public string[] props { get; set; }        
            public List<DataForList> data { get; set; }
            public List<EnumValues> appraisal { get; set; }
        }

        public class KnowAdd
        {
            public int Id { get; set; }
            public DateTime Creation { get; set; }
            public DateTime? Modification { get; set; }
            public string Subject { get; set; }
            public string Body { get; set; }
        }

        public class KnowHow
        {
            public string caption { get; set; }
            public string[] headers { get; set; }
            public string[] types { get; set; }
            public string[] props { get; set; }
            public List<DataForKnowledge> data {get; set; }
        }
        public class DataForList
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public DateTime? Begin { get; set; }
            public DateTime? End { get; set; }
            public string Reference { get; set; }
            public int? Duration { get; set; }
            public bool? Done { get; set; }
            public string Notes { get; set; }
            public string Status { get; set; }
            public int? Planned { get; set; }
            public string Branch { get; set; }
            public byte? Appraisal { get; set; }
            public string Appraisal_Str => this.Appraisal != null ? Enum.GetName(typeof(toDoStatus), this.Appraisal) : ""; // Enum.GetName(typeof(toDoStatus), 0)
            public string AppraisalNote { get; set; }
            public List<TimeChunkInfo> TimeChunks { get; set; }
            public List<File> Files { get; set; }
        }

        public class DataForKnowledge
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime? Creation { get; set; }
        public DateTime? Modification { get; set; }
        public string Body { get; set; }
    }

        public class Data
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public DateTime? Begin { get; set; }
            public DateTime? End { get; set; }
            public string Reference { get; set; }
            public int? Duration { get; set; }
            public bool? Done { get; set; }
            public string Notes { get; set; }
            public int? Planned { get; set; }
            public string Branch { get; set; }
            public byte? Appraisal { get; set; }
            public string AppraisalNote { get; set; }
        }

        public class PauseInfo
        {
            public int Duration { get; set; }
            public bool Paused { get; set; }
        }

        public class TimeChunkInfo
        {
            public int Id { get; set; }
            public DateTime? Begin { get; set; }
            public DateTime? End { get; set; }
        }

        public class StopIdx
        {
            public int StopId { get; set; }
        }

        public class InfoDone
        {
            public int Id { get; set; }
            public bool? Done { get; set; }

        }
        public class InfoId
        {
            public int Id { get; set; }
        }

        public class TimeToken
        {
            public string Name { get; set; }
            public string Token { get; set; }
            public int When { get; set; }
        }

        public class EnumValues
        {
            public int EnumValue { get; set; }
            public string EnumDisplayName { get; set; }
        }

    }
}