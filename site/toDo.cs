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
    
    public partial class toDo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public toDo()
        {
            this.Breaks = new HashSet<Break>();
        }
    
        public int Id { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> Begin { get; set; }
        public Nullable<System.DateTime> End { get; set; }
        public string Reference { get; set; }
        public Nullable<int> Duration { get; set; }
        public Nullable<bool> Done { get; set; }
        public string Notes { get; set; }
        public Nullable<bool> DontShow { get; set; }
        public Nullable<int> Planned { get; set; }
        public string Branch { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Status_Note { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Break> Breaks { get; set; }
     
    }
}
