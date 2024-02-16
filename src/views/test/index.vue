<template>
    <div id="app">
        <!--
                    <a style="display: block" @click="share('docx')" href="#">分享docx</a>
                    <br/>
                    <a style="display: block" @click="share('jpeg')" href="#">分享jpeg</a>
                    <br/>
                    <a style="display: block" @click="share('mp3')" href="#">分享mp3</a> <br/>
                    <a style="display: block" @click="share('mp4')" href="#">分享mp4</a> <br/>
                    <a style="display: block" @click="share('pptx')" href="#">分享pptx</a>
                    <br/>
                    <a style="display: block" @click="share('xlsx')" href="#">分享xlsx</a>
                    <br/>
                    <a style="display: block" @click="share('txt')" href="#">分享指定网页地址</a>
                    <br/>
                    <label for="files">选择本地文件分享</label>
                    <br>
            -->
        <a
                id="your-form"
                style="display: block"
                @click="share('local')"
                href="#"
        ></a>
        <a @click="getClientInfo">调用jsBriage接口获取应用版本号</a>
        <van-divider/>
<!--
        <p>测试下拉框</p>
        <label for="pet-select">Choose a pet:</label>
        <select name="pets" id="pet-select">
            <option value="">&#45;&#45;Please choose an option&#45;&#45;</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
        </select>
        <van-divider/>
-->
        <p>多文件上传</p>
        <van-uploader v-model="fileList" multiple/>
        <van-divider/>
        <p>单文件测试</p>
        <van-uploader v-model="files" reupload/>
        <van-divider/>
        <p>拍照模式</p>
        <van-uploader v-model="camera" capture=""/>
        <van-divider/>
        <p>拍摄视频</p>
        <van-uploader v-model="video" accept="video/*" capture="2"/>
        <van-divider/>
        <a  href="https://m.ithome.com" >网页测试:打开it之家</a > |  
        <a  href="https://weibo.com" >网页测试:打开微博</a>
        <van-divider/>
        <a href="https://www.p2hp.com/webcammictest/">p2hp摄像头测试</a> | <a href="https://qrcode.antfu.me">qrcode摄像头测试</a> <br/>
        <van-divider/>
        <a href="https://bing.com">bing语音搜索测试</a><br/>
        <van-divider/>
        <a href="https://people.csail.mit.edu/ericchan/hdr/hdr.php">HDR图片(geckoview暂不支持)</a><br/>
        <van-divider/>
        <a href="https://map.baidu.com/@12742132,3543967,13z">百度地图</a> | <a href="https://www.opengps.cn/Share/ShareLocation/LocationTest.aspx" >opengps地图定位测试</a
        <van-divider/>
        <a href="https://zegodev.gitee.io/zego-express-webrtc-sample/webrtcCheck/index.html" >webrtc测试</a >
       <van-divider/>
<!--        <a href="#" @click="downloadBlob">下载blob 文件测试</a>-->
<!--        <van-divider/>-->
		<a href="https://down.pc.yyb.qq.com/packing/5c457fa5c5aff61895772ab54a05d94c/pc_yyb_2100100012_installer.exe" download="1.ext">下载测试</a>
        <van-divider/>
        <a href="https://www.bilibili.com/">测试打开bilibili客户端</a>
        <van-divider/>
        <a href="https://ddys.one">视频播放测试1</a>
        <van-divider/>
        <a href="https://halihali.icu">视频播放测试2</a>
        <van-divider/>

    </div>
</template>

<script name="Test">
import {ref} from "vue";
import {getClientLatestVersion} from "@/utils/webview";

window.callback = function (param) {
    console.log(param);
};
export default {
    name: "App",
    setup() {
        const imageSrc = ref("");
        const imageSrcs = ref([]);
        const handleFileChange = event => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                imageSrc.value = event.target.result; // 更新图像的数据URL
            };
            reader.readAsDataURL(file);
        };
        const handleFilesChanges = event => {
            console.log("handleFilesChanges")
            try {
                imageSrcs.value = [];
                console.log("handleFilesChanges: " + event.target.files.length);
                for (let i = 0; i < event.target.files.length; i++) {
                    const file = event.target.files[i];
                    const reader = new FileReader();
                    reader.onload = event => {
                        imageSrcs.value.push(event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            } catch (e) {
                console.log("文件出错" + e);
            }
        };
        const fileLists = ref([
            {url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'},
        ]);
        const files = ref();
        const camera = ref();
        const video = ref();
        return {
            fileList: fileLists,
            camera,
            video,
            files,
            imageSrc,
            imageSrcs,
            handleFileChange,
            handleFilesChanges
        };
    },
    mounted() {
    },
    methods: {
        getClientInfo() {
            function requestWithPromise(param) {
                return getClientLatestVersion(param);
            }

            // 生成唯一的回调 ID
            // 调用示例
            requestWithPromise("Hello")
                .then(response => {
                    window.alert("当前应用版本为:" + response)
                })
                .catch(error => {
                    window.alert("请求报错" + error)
                });
        },
        downloadApp() {
        },
        downloadBlob() {
            function downloadBlobImage(dataURL, filename) {
                // Convert data URL to Blob
                var byteString = atob(dataURL.split(",")[1]);
                var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([ab], {type: mimeString});

                // Create an <a> element
                var link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;

                // Trigger the download
                link.click();
            }

            // Usage example
            var dataURL =
                "data:image/png;base64,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"; // Replace with your data URL
            function downloadImage(dataURL, filename) {
                // Create an <a> element
                var link = document.createElement("a");
                link.href = dataURL;
                link.download = filename;

                // Trigger the download
                link.click();
            }

            downloadBlobImage(dataURL, "lazycat.png");
        },
        goback() {
            window.history.back();
        },
        async share(type) {
            console.log("开始分享");
            if (type === "txt") {
                const shareData = {
                    title: "天翼云",
                    text: "天翼云是中国电信的云存储服务",
                    url: "https://189.com/test_doc/a.jpeg"
                };
                navigator.share(shareData);
            } else if (type === "local") {
                const input = document.getElementById("files");
                const files = input.files;
                if (files.length === 0) {
                    return;
                }
                files.forEach(obj => {
                    window.alert("文件的名字" + obj.name);
                });
                /*                await navigator.share({
                                            files: [files[0]],
                                        });*/
                var file = files[0];
                var promise = await this.fileToArrayBuffer(file);
                var byteLength1 = promise.byteLength;
                console.log("该文件的长度");
                lzc_share.uploadFile(file.name, new Uint8Array(promise));
            } else {
                try {
                    const fileName = "a." + type;
                    // const addr = 'http://192.168.1.109:8080/home/song/test_doc/';
                    const addr = "https://189.com/test_doc/";
                    const response = await this.sendRequest(addr + fileName);
                    var contentType = response.type;
                    var arrayBuffer = await response.arrayBuffer();
                    var byteLength = arrayBuffer.byteLength;
                    // var uint8Array = new Uint8Array(response); 这里的response 是arraybuffer
                    lzc_share.uploadFile(fileName, new Uint8Array(arrayBuffer));
                    const file = new File([response], fileName, {type: contentType});
                    await navigator.share({
                        files: [file]
                    });

                    var data = new FormData();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        fileToArrayBuffer(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
        },
        sendRequest(url) {
            return new Promise((resolve, reject) => {
                if (url) {
                    let xhr = new XMLHttpRequest();
                    xhr.responseType = "blob";
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                resolve(xhr.response);
                            } else {
                                resolve(xhr.response);
                            }
                        }
                    };
                    xhr.open("get", url, true);
                    xhr.send(null);
                } else {
                    resolve(null);
                }
            });
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}

.p20 {
    padding: 20px;
}
</style>
