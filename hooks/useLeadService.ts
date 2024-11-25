import React, { useCallback } from 'react'

const useLeadService = () => {
    const createLead = useCallback(async (lead) => {
        const reqBody = {
          firstName: lead.prenom,
          lastName: lead.nom,
          phone: lead.telephone,
          email: lead.email,
          address: lead.adresse,
          postalCode: lead.codePostal,
          city: lead.ville,
          country: lead.pays,
          ProjectCode: 'SAFEWAY',
          additionalData: {
            IsParrainageSelected: lead.isParrainageSelected,
            TelephoneParrain: lead.telephoneParrain,
            TypeDeBien: lead.typeDeBien,
            anneDeContruction: lead.anneDeContruction,
            typeDeChauffage: lead.typeDeChauffage,
            delai: lead.delai,
            superficie: lead.superficie,
            revenue: lead.revenue,
            nbrePerson: lead.nbrePerson,
            dpe: lead.dpe,
            TypeDeBienAutre: lead.typeDeBienAutre,
            DescriptifTravaux: lead.descriptifTravaux,
            dateRDV: lead.calendarDate,
            typeRappel: lead.typeTime,
            LeadType: lead.leadType,
          },
          created_by: 1,
          updated_by: 1,
        };
    
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY
            },
            body: JSON.stringify(reqBody),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error("Error storing form data in API:", error);
          throw error;
        }
      }, []);
    
      const updateLead = useCallback(async (lead) => {
        const reqBody = [
          {
            path: "/additionalData/dateRDV",
            op: "replace",
            value: lead.calendarDate,
          },
          {
            path: "/additionalData/typeRappel",
            op: "replace",
            value: lead.typeTime,
          },
        ];
    
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${lead.leadID}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY
              },
              body: JSON.stringify(reqBody),
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error("Error updating form data in API:", error);
          throw error;
        }
      }, []);

      return { createLead, updateLead };

}

export default useLeadService