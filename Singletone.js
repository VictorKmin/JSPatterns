
// Вказую змінну як самовикликаючусь функцію.
let mySingleTone = (()=>{
    // обовязково повинна бути пуста змінна instance
    let instance;

    // голвний метод
    function init() {
        // Всередині головного метода пишуться функції та змінні які будуть приватні
        function privateMethod() {
            console.log('PRIVATE');
        }
        let prProp = 'hello Private';

        // в ретурні вказуємо як буде називатись те, до чого ми зможемо доступитись, та щол буде всередині
        return {
            publicmethod: function () {
                console.log('NE PRIVATE');
            },
            getPrivateMethod: function () {
                return privateMethod();
            }
        }
    }

    // це те, що поверне нам наша змінна
    return {
        // є тільки один метод. Якщо змінна instance пуста, то ми їй присвоємо те, що в init()
        getInsance: function () {
            if (!instance){
                instance = init();
            }
            // Якщо instance не пуста, то ми прото її повертаємо та сам init вже ніколи не чупаєм
            return instance
        }
    }
})();

let singleA = mySingleTone.getInsance();
singleA.getPrivateMethod();



// так та Singletone виглядає конекшн з базою
// (з навчального проекту)
//
// module.exports = (() => {
//     let instance;
//     function initConnection() {
//         let client = new Sequelize('testDB', 'root', 'root', {
//             host: 'localhost',
//             dialect: 'postgres',
//             operatorsAliases: false,
//
//             pool: {
//                 max: 5,
//                 min: 0,
//                 acquire: 30000,
//                 idle: 10000
//             }
//         });
//         let models = {};
//
//         function getModels() {
//             fs.readdir('./service/DataBase/models', (err, files) => {
//                 files.forEach(file => {
//                     const modelName = file.split('.')[0];
//                     models[modelName] = client.import(resolve(`./service/DataBase/models/${modelName}`));
//                     // this.models[modelName] = constr().client.import(resolve(`./service/DataBase/models/${modelName}`));
//                     // console.log(constr().models.import(resolve(`./service/DataBase/models/${modelName}`)));
//                     console.log(client.models);
//                 });
//             });
//         }
//
//         return {
//             getModel: (modelName) => models[modelName],
//             setModels: () => {
//                 return getModels();
//             }
//         };
//     }
//
//     return {
//         getInstance: () => {
//             if (!instance) {
//                 instance = initConnection();
//             }
//             return instance;
//         }
//     }
// })();