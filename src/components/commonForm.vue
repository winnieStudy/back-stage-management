<template>
  <div>
    <el-form label-width="100px" :inline="inline" :mode="form" :rules="rules" ref="formName">
      <el-form-item v-for="item in label" :key="item.label" :label="item.label" :prop="item.prop">
        <el-input v-if="item.type === 'Input'" :placeholder="item.placeholder" v-model="form[item.model]"></el-input>
        <el-input-number v-if="item.type === 'InputNumber'" :min="item.min" :placeholder="item.placeholder" v-model="form[item.model]"></el-input-number>
        <el-date-picker v-if="item.type === 'Date'" type="date" v-model="form[item.model]" :placeholder="item.placeholder" value-format="yyyy-mm-dd"></el-date-picker>
        <el-date-picker v-if="item.type === 'DateRange'" type="daterange" v-model="form[item.model]" :placeholder="item.placeholder" value-format="yyyy-mm-dd" ></el-date-picker>
        <el-select v-if="item.type === 'Select'" v-model="form[item.model]" :placeholder="item.placeholder">
          <el-option v-for="item1 in item.opts" :key="item1.label" :label="item1.label" :value="item1.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </div>
</template>
<script>

export default  {
  props: {
    label: Array,
    inline: Boolean,
    form: Object,
    rules: Object
  },
  data() {
    return {

    }
  }
 
}
</script>
