console.time("Page Start")

const App = () => {

    const {
        restoreElements,
        convertToExcalidrawElements,
        useHandleLibrary,
        Excalidraw,
        loadSceneOrLibraryFromBlob
    } = ExcalidrawLib;

    const { useState } = React;

    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    // const updateScene = () => {
    //     const sceneData = {
    //       elements: restoreElements(
    //         convertToExcalidrawElements([
    //           {
    //             type: "rectangle",
    //             id: "rect-1",
    //             fillStyle: "hachure",
    //             strokeWidth: 1,
    //             strokeStyle: "solid",
    //             roughness: 1,
    //             angle: 0,
    //             x: 100.50390625,
    //             y: 93.67578125,
    //             strokeColor: "#c92a2a",
    //             width: 186.47265625,
    //             height: 141.9765625,
    //             seed: 1968410350,
    //             roundness: {
    //               type: 3,// ROUNDNESS.ADAPTIVE_RADIUS,
    //               value: 32,
    //             },
    //           },
    //           {
    //             type: "arrow",
    //             x: 300,
    //             y: 150,
    //             start: { id: "rect-1" },
    //             end: { type: "ellipse" },
    //           },
    //           {
    //             type: "text",
    //             x: 300,
    //             y: 100,
    //             text: "HELLO WORLD!",
    //           },
    //         ]),
    //         null,
    //       ),
    //       appState: {
    //         viewBackgroundColor: "#edf2ff",
    //       },
    //     };
    //     if (excalidrawAPI) excalidrawAPI.updateScene(sceneData);
    // };

    // setTimeout(updateScene, 10000)

    const loadFile = () => {
        fetch("abcd.excalidraw").then((res) => res.blob()).then(data => {
            const reader = new FileReader();
            reader.readAsDataURL(data);

            reader.onload = function () {
                loadSceneOrLibraryFromBlob(data, null, null).then((contents) => {
                    if (excalidrawAPI) {
                        // console.log(contents);
                        excalidrawAPI.updateScene(contents.data);
                        const elements = excalidrawAPI.getSceneElements();
                        excalidrawAPI.scrollToContent(elements[0], {
                            fitToContent: true,
                        });

                        console.timeEnd("Page Start")
                    }
                })
            };
        });
    };

    loadFile();

    const UIOptions = {
        canvasActions: {
            changeViewBackgroundColor: false,
            clearCanvas: false,
            loadScene: false,
            saveToActiveFile: false,
            toggleTheme: false,
            saveAsImage: false,
            saveFileToDisk: false,
        },
    };

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "div",
            {
                style: { height: "500px" },
            },
            React.createElement(Excalidraw, {
                UIOptions,
                excalidrawAPI: (api) => setExcalidrawAPI(api)
            })
        )
    );

};

const excalidrawWrapper = document.getElementById("app");
const root = ReactDOM.createRoot(excalidrawWrapper);
root.render(React.createElement(App));
