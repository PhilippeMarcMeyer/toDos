//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace site
{
    using System;
    using System.Collections.Generic;
    
    public partial class Note
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> Creation { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Concern { get; set; }
        public Nullable<int> ConcernId { get; set; }
    }
}
