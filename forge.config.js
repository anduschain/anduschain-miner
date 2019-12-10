module.exports = {
    make_targets: {
        win32: ["zip", "squirrel"],
        darwin:["zip"]
    },
    makers: [
        {
            name: "@electron-forge/maker-zip",
            platforms: ['darwin', 'win32'],
        },
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "anduschain_miner",
                authors: "andus",
                iconUrl: "https://raw.githubusercontent.com/anduschain/anduschain-miner/master/src/resources/icon.ico",
                setupIcon: "./src/resources/icon.ico",
                copyright: "Copyright ©2019 AndUs. All rights reserved."
            }
        },
        // {
        //     "name": "@electron-forge/maker-deb",
        //     "config": {}
        // },
        // {
        //     "name": "@electron-forge/maker-rpm",
        //     "config": {}
        // }
    ],
    plugins: [
        [
            "@electron-forge/plugin-webpack",
            {
                mainConfig: "./webpack.main.config.js",
                renderer: {
                    config: "./webpack.renderer.config.js",
                    entryPoints: [
                        {
                            html: "./src/renderer/index.html",
                            js: "./src/renderer/index.js",
                            name: "main_window"
                        }
                    ]
                }
            }
        ]
    ]
}