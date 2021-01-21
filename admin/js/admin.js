(function() {
    const helper = require("../../static/js/helper_index");
    const connection = require("../../static/js/db");
    let db;

    async function init() {
        db = await connection();

        getAllUsers = async (props = null) => {
            const getAllUsersDb = await db.collection("users");
            let result;
            let score;
            let count;

            if (props) {
                if (props.action === "sort") {
                    const column = props.prop;
                    result = await getAllUsersDb.find().sort({[column]: -1}).toArray();
                }
            } else {
                result = await getAllUsersDb.find().toArray(); // возможно стоит отключить первичную сортировку по имени для правильной работы пагинации?
            }

            for (let obj of result) {
                score = await helper.getScore(obj.login);
                count = await getUserGameCount(obj._id.toString());
                obj.score = score;
                obj.count = count;
            }

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