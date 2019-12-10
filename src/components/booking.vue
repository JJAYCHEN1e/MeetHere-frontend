<template>
  <el-dialog title="场馆预定" :visible.sync="currentDialogVisible">
    这里你可以进行场馆的预定呢
  </el-dialog>
</template>

<script>
export default {
  name: "booking",
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