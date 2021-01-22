(function() {
    const helper = require("../../static/js/helper_index");
    const connection = require("../../static/js/db");
    let db;
      
    async function init() {
        db = await connection();

        getAllUsers = async (props = null) => { // TODO: разнести по функциям
            const getAllUsersDb = await db.collection("users");
            let preCount = await getAllUsersDb.find().count();
            let column, result, score, sortState, sortValue, countCollections;
            let count;

            if (props) {
                let skipCount;

                if (props.page == 1) skipCount = 0;
                else skipCount = props.page * 10 - 10;
                if (props.action === "pagin" && !props.state) {

                    result = await getAllUsersDb.find().skip(skipCount).limit(10).toArray();
                } else if (props.state && props.action === "sort" || props.action === "pagin" ) {
                    column      = props.sort === "id" ? `_${props.sort}` : props.sort;
                    sortState   = props.state;
                    sortValue   = 0;

                    if (sortState == "sort-up") sortValue = 1;
                    else if (sortState == "sort-down") sortValue = -1;

                    result = await getAllUsersDb.find().sort({[column]: sortValue}).skip(skipCount).limit(10).toArray();
                }
                result.page = props.page; // active page
            } else {
                result = await getAllUsersDb.find().limit(10).toArray(); // default
            }

            for (let obj of result) {
                score = await helper.getScore(obj.login);
                count = await getUserGameCount(obj._id.toString());

                obj.data  = obj.data.toString().slice(0, 24);
                obj.score = score;
                obj.count = count;
                if (props) obj.sort = props.sort;
                if (props) obj.state = sortValue;
            }

            countCollections = preCount / 10;
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