const Admin = require('./models/Admin');
const Actionneur = require('./models/Actionneur');
const Capteur = require('./models/Capteur');
const Espece = require('./models/Espece');
const Parcelle = require('./models/Parcelle');
const SousEspece = require('./models/SousEspece');
const Mesure = require('./models/Mesure');
const PlanAction = require('./models/PlanActionneur');
const PlanCapteur = require('./models/PlanCapteur');
const Action = require('./models/Action');
let str = "kd229303enddn"
function test(n,x) {
    if(x==1){
        for (let i = 0; i < n; i++) {
            const newAdmin = new Admin({
                code: str,
                name: str,
                addresse:str,
                sexe:str,
                niveau: str,
                code_createur: str,
                statut:true,
              });
              newAdmin.save() 
              .then(x =>console.log(x)
              ) .catch(err =>console.log(err))    
        }
    }
    if(x==2){
        for (let i = 0; i < n; i++) {
            const newAdmin = new Actionneur({
                name: str,
                type_grandeur: str,
                description:str,
                effectif:str,
                code_createur:str,
                statut: true,
              });
              newAdmin.save() 
              .then(x =>console.log(x)
              ) .catch(err =>console.log(err))    
        }
    }
    if(x==3){
        for (let i = 0; i < n; i++) {
            const newAdmin = new Capteur({
                name: str,
                type_grandeur: str,
                description:str,
                effectif: str,               
                code_createur: str,
                statut: true,
              });
              newAdmin.save() 
              .then(x =>console.log(x)
              ) .catch(err =>console.log(err))    
        }
    }
    if(x==4){
        for (let i = 0; i < n; i++) {
            const newAdmin = new Espece({
                name: str,
                description: str,              
                code_createur: str,
                statut: true,
              });
              newAdmin.save() 
              .then(x =>console.log(x)
              ) .catch(err =>console.log(err))    
        }
    }
    if(x==5){
        for (let i = 0; i < n; i++) {
            const newAdmin = new Parcelle({
                indice_crois: 10,
                indice_perf: 10,
                nombre_plant: 10,
                code_createur: str,
                statut: true,
              });
              newAdmin.save() 
              .then(x =>console.log(x)
              ) .catch(err =>console.log(err))    
        }
    }
    if(x==6){
        for (let i = 0; i < n; i++) {
            Espece.find()
                .then(espece => {
                    Parcelle.findOne({statut:true})
                    .then(parcelle=> {
                        const newAdmin = new SousEspece({
                            name: str,
                            description: str,
                            code_createur: str,
                            statut: true,
                            parcelle: parcelle,
                            espece: espece[0],
                          });
                          newAdmin.save() 
                          .then(x =>console.log(x)
                          ) .catch(err =>console.log(err)) 
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))   
        }
    }
    if(x==7){
        for (let i = 0; i < n; i++) {
            Capteur.find()
                .then(actionneur => {
                    Parcelle.findOne({statut:false})
                    .then(parcelle=> {
                        const newAdmin = new Mesure({
                            grandeur: 100,
                            valeur:10,
                            statut:true,
                            capteur:actionneur[0],
                            parcelle:parcelle,
                          });
                          newAdmin.save() 
                          .then(x =>console.log(x)
                          ) .catch(err =>console.log(err)) 
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))   
        }
    }
    if(x==8){
        for (let i = 0; i < n; i++) {
            Parcelle.find()
                .then(data1 => {
                    Actionneur.findOne({statut:true})
                    .then(data2=> {
                        const newAdmin = new PlanAction({
                            details:str,
                            attribut_quatre: str,
                            code_createur:str,
                            statut:true,
                            parcelle: data1[0],
                            actionneur: data2,
                          });
                          newAdmin.save() 
                          .then(x =>console.log(x)
                          ) .catch(err =>console.log(err)) 
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))   
        }
    }
    if(x==9){
        for (let i = 0; i < n; i++) {
            Parcelle.find()
                .then(data1 => {
                    Capteur.findOne({statut:true})
                    .then(data2=> {
                        Admin.findOne({statut:true})
                            .then(data3 =>{
                                const newAdmin = new PlanCapteur({
                                    details: str,
                                    attribut_quatre: str,
                                    code_createur: str,
                                    statut: true,
                                    parcelle: data1[1],
                                    capteur: data2,
                                    admin:data3,
                                  });
                                  newAdmin.save() 
                                  .then(x =>console.log(x)
                                  ) .catch(err =>console.log(err)) 
                            })
                            .catch(err => console.log(err))
                        
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))   
        }
    }
    if(x==10){
        for (let i = 0; i < n; i++) {
            Parcelle.findOne({statut:true})
                .then(data1 => {
                    PlanAction.findOne({statut:true})
                    .then(data2=> {
                        const newAdmin = new Action({
                            statut:true,
                            parcelle:data1,
                            planactioneur:data2,
                          });
                          newAdmin.save() 
                          .then(x =>console.log(x)
                          ) .catch(err =>console.log(err)) 
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))   
        }
    }
}
module.exports = {
    "test":test
} ;