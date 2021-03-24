import React, { useState } from 'react';
import * as tf from "@tensorflow/tfjs";
// import * as tfvis from "@tensorflow/tfjs-vis";
import * as Papa from "papaparse"; 

const Housing_price = () => {
    const csvUrl = 'housing.csv';
    const trainModel = () => {
        const csvDataset = tf.data.csv(true,
            csvUrl, {
            columnConfigs: {
                price: {
                    isLabel: true
                }
            }
        });

        const numOfFeatures = (csvDataset.columnNames()).length - 1;
        console.log(numOfFeatures)
        // const flattenedDataset =
        //     csvDataset
        //         .map(({ xs, ys }) => {
        //             return { xs: Object.values(xs), ys: Object.values(ys) };
        //         })
        //         .batch(10);

        // const model = tf.sequential();
        // model.add(tf.layers.dense({
        //     inputShape: [22],
        //     units: 22,
        //     activation: "sigmoid"
        // }));
        // model.add(tf.layers.dense({ units: 1 }))
        // model.compile({
        //     optimizer: tf.train.sgd(0.001),
        //     loss: "meanSquaredError",
        //     metrics: [tf.metrics.meanAbsoluteError]
        // });

        // model.fitDataset(flattenedDataset, {
        //             epochs: 10,
        //             callbacks: {
        //                 onEpochEnd: async (epoch, logs) => {
        //                     console.log(epoch + ':' + logs.loss);
        //                 }
        //             }
        //         });

        console.log("done");
        // return model 
    };

    
        // const model = tf.sequential();
        // model.add(tf.layers.dense({
        //     inputShape: [numOfFeatures],
        //     units: 1
        // }));
        // model.compile({
        //     optimizer: tf.train.sgd(0.000001),
        //     loss: 'meanSquaredError'
        // });

        // console.log("done");

        // model = tf.sequential();
    
        // model.add(
        //     tf.layers.dense({
        //         inputShape: [numOfFeatures],
        //         units: numOfFeatures.shape[1],
        //         activation: "sigmoid"
        //     })
        // );
        // model.add(tf.layers.dense({ units: 1 }));
    
        // model.compile({
        //     optimizer: tf.train.sgd(0.001),
        //     loss: "meanSquaredError",
        //     metrics: [tf.metrics.meanAbsoluteError]
        // });

        // const trainLogs = [];
        // await model.fit(flattenedDataset, {
        //     batchSize: 32,
        //     epochs: 100,
        //     shuffle: true,
        //     validationSplit: 0.1,
        //     callbacks: {
        //         onEpochEnd: async (epoch, logs) => {
        //             trainLogs.push({
        //                 rmse: Math.sqrt(logs.loss),
        //                 val_rmse: Math.sqrt(logs.val_loss),
        //                 mae: logs.meanAbsoluteError,
        //                 val_mae: logs.val_meanAbsoluteError
        //             });
        //             // tfvis.show.history(lossContainer, trainLogs, ["rmse", "val_rmse"]);
        //             // tfvis.show.history(accContainer, trainLogs, ["mae", "val_mae"]);
        //         }
        //     }
        // });

        
    //     return model;
    // }
    trainModel();

    // const csvUrl =
    //     './boston-housing-train.csv';

    // async function run() {
    //     // We want to predict the column "medv", which represents a median value of
    //     // a home (in $1000s), so we mark it as a label.
    //     const csvDataset = tf.data.csv(
    //         csvUrl, {
    //         columnConfigs: {
    //             medv: {
    //                 isLabel: true
    //             }
    //         }
    //     });

    //     // Number of features is the number of column names minus one for the label
    //     // column.
    //     const numOfFeatures = (await csvDataset.columnNames()).length - 1;

    //     // Prepare the Dataset for training.
    //     const flattenedDataset =
    //         csvDataset
    //             .map(({ xs, ys }) => {
    //                 // Convert xs(features) and ys(labels) from object form (keyed by
    //                 // column name) to array form.
    //                 return { xs: Object.values(xs), ys: Object.values(ys) };
    //             })
    //             .batch(10);

    //     // Define the model.
    //     const model = tf.sequential();
    //     model.add(tf.layers.dense({
    //         inputShape: [numOfFeatures],
    //         units: 1
    //     }));
    //     model.compile({
    //         optimizer: tf.train.sgd(0.000001),
    //         loss: 'meanSquaredError'
    //     });

    //     // Fit the model using the prepared Dataset
    //     return model.fitDataset(flattenedDataset, {
    //         epochs: 10,
    //         callbacks: {
    //             onEpochEnd: async (epoch, logs) => {
    //                 console.log(epoch + ':' + logs.loss);
    //             }
    //         }
    //     });
    // }

    // run();

    return(
        <div>
            <h1>welcome</h1>
        </div>
    )
}

export default Housing_price;