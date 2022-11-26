<script setup lang="ts">
import { ref } from "vue";
import { ipc } from "@/preload/ipc";
import { ipcRenderer } from "electron";
import type { IpcRendererEvent } from "electron";

const selectedPath = ref("");

defineOptions({
  name: "Welcome"
});

const openDialog = () => {
  console.log("openDialog");
  ipc.send("start-open-file-dialog");
};

ipcRenderer.on(
  "end-open-file-dialog",
  (event: IpcRendererEvent, filePaths: unknown) => {
    console.log("received", event, filePaths);
    const paths = filePaths as string[];
    if (paths.length > 0) {
      selectedPath.value = `You selected: ${paths.join("; ")}`;
      console.log("selectedPath:", selectedPath.value);
    }
  }
);
</script>

<template>
  <div style="padding: 10px">
    <h1>Pure-Admin-Thin（非国际化版本）</h1>
    <br />
    <el-button size="default" type="primary" @click="openDialog">
      Open Dialog
    </el-button>
    <br />
    <span>{{ selectedPath }}</span>
  </div>
</template>
