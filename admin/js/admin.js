(function() {
    const helper = require("../../static/js/helper_index");
    const connection = require("../../static/js/db");
    let db;

    async function init() {
        db = await connection();

        getAllUsers = async (props = null) => {
            const getAllUsersDb = await db.collection("users");
            let preCount = await getAllUsersDb.find().count();
            let result;
            let score;
            
            let count;
            
            if (props) {
                if (props.action === "sort") { // TODO: добавить учет пагинации
                    const column = props.prop;
                    result = await getAllUsersDb.find().sort({[column]: -1}).limit(10).toArray(); 
                } else if (props.action === "pagin") { // TODO: добавить учет сортировки
                    let page = props.prop;
                    if (page == 1) page = 0;
                    else page = page * 10 - 10; 
                    result = await getAllUsersDb.find().limit(10).skip(page).toArray(); // .sort({[column]: -1})
                    result.page = props.prop;
                }
            } else {
                result = await getAllUsersDb.find().limit(10).toArray();
            }

            for (let obj of result) {
                score = await helper.getScore(obj.login);
                count = await getUserGameCount(obj._id.toString());
                obj.score = score;
                obj.count = count;
            }

            let countCollections = preCount / 10;
            result.countColl = countCollections < 1 ? Math.floor(countCollections) : Math.ceil(countCollections);

            return result;
        }

        getUserGameCount = async (id) => {
            const getAllUserResultsDb = await db.collection("results");
            const preCount = await getAllUserResultsDb.find({id: id}).toArray();
            return preCount.length;
        }

        columnsFilter = () => {

        }

        tablesPagination = () => {

        }

        module.exports.getAllUsers = getAllUsers;
    }

    init();
})();