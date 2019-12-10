<template>
  <el-dialog title="场馆详情" :visible.sync="currentDialogVisible">
    这里有场馆描述和评论和你可以添加评论呢
  </el-dialog>
</template>

<script>
export default {
  name: "comment",
  props: ["dialogVisible"],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      
    };
  }, 
  watch: {
    dialogVisible: function(newValue) {
      this.currentDialogVisible = newValue;
    },
    currentDialogVisible: function(newValue) {
      this.$emit("updateDialogVisible", newValue);
    }
  }
};
</script>

<style>
</style>