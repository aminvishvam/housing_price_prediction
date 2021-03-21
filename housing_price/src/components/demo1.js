import * as tf from "@tensorflow/tfjs";
// import * as tfvis from "@tensorflow/tfjs-vis";
import * as Papa from "papaparse";


Papa.parsePromise = function (file) {
    return new Promise(function (complete, error) {
        Papa.parse(file, {  
            header: true,
            download: true,
            dynamicTyping: true,
            complete,
            error
        });
    });
};

const prepareData = async () => {
    const csv = await Papa.parsePromise(
        "./housing.csv"
    );

    return csv.data;
};

// const [modelState, setModelState] = useState({
//     data:[]
// });

const VARIABLE_CATEGORY_COUNT = {
    OverallQual: 10,
    GarageCars: 5,
    FullBath: 4
};

// normalized = (value − min_value) / (max_value − min_value)
const normalize = tensor =>
    tf.div(
        tf.sub(tensor, tf.min(tensor)),
        tf.sub(tf.max(tensor), tf.min(tensor))
    );

const oneHot = (val, categoryCount) =>
    Array.from(tf.oneHot(val, categoryCount).dataSync());

const createDataSets = (data, features, categoricalFeatures, testSize) => {
    const X = data.map(r =>
        features.flatMap(f => {
            if (categoricalFeatures.has(f)) {
                return oneHot(!r[f] ? 0 : r[f], VARIABLE_CATEGORY_COUNT[f]);
            }
            return !r[f] ? 0 : r[f];
        })
    );

    const X_t = normalize(tf.tensor2d(X));

    const y = tf.tensor(data.map(r => (!r.SalePrice ? 0 : r.SalePrice)));

    const splitIdx = parseInt((1 - testSize) * data.length, 10);

    const [xTrain, xTest] = tf.split(X_t, [splitIdx, data.length - splitIdx]);
    const [yTrain, yTest] = tf.split(y, [splitIdx, data.length - splitIdx]);

    return [xTrain, xTest, yTrain, yTest];
};

const trainLinearModel = async (xTrain, yTrain) => {
    const model = tf.sequential();

    model.add(
        tf.layers.dense({
            inputShape: [xTrain.shape[1]],
            units: xTrain.shape[1],
            activation: "sigmoid"
        })
    );
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
        optimizer: tf.train.sgd(0.001),
        loss: "meanSquaredError",
        metrics: [tf.metrics.meanAbsoluteError]
    });

    const trainLogs = [];
    // const lossContainer = document.getElementById("loss-cont");
    // const accContainer = document.getElementById("acc-cont");

    await model.fit(xTrain, yTrain, {
        batchSize: 32,
        epochs: 100,
        shuffle: true,
        validationSplit: 0.1,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                trainLogs.push({
                    rmse: Math.sqrt(logs.loss),
                    val_rmse: Math.sqrt(logs.val_loss),
                    mae: logs.meanAbsoluteError,
                    val_mae: logs.val_meanAbsoluteError
                });
                // tfvis.show.history(lossContainer, trainLogs, ["rmse", "val_rmse"]);
                // tfvis.show.history(accContainer, trainLogs, ["mae", "val_mae"]);
            }
        }
    });

    return model;
};

const run = async ()=>{
    const data = await prepareData();

    const [
        xTrainSimple,
        xTestSimple,
        yTrainSimple,
        yTestIgnored
    ] = createDataSets(data, ["GrLivArea"], new Set(), 0.1);
    const simpleLinearModel = await trainLinearModel(xTrainSimple, yTrainSimple);

    const features = [
        "OverallQual",
        "GrLivArea",
        "GarageCars",
        "TotalBsmtSF",
        "FullBath",
        "YearBuilt"
    ];
    const categoricalFeatures = new Set([
        "OverallQual",
        "GarageCars",
        "FullBath"
    ]);
    const [xTrain, xTest, yTrain, yTest] = createDataSets(
        data,
        features,
        categoricalFeatures,
        0.1
    );
    const linearModel = await trainLinearModel(xTrain, yTrain);

    const trueValues = yTest.dataSync();
    const slmPreds = simpleLinearModel.predict(xTestSimple).dataSync();
    const lmPreds = linearModel.predict(xTest).dataSync();
    console.log(xTest)
    // console.log(trueValues, slmPreds, lmPreds)
    // renderPredictions(trueValues, slmPreds, lmPreds);
}

run();