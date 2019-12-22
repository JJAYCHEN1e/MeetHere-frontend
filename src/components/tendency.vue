<template>
    <div>
    <div class="chart-for-time">
        <div id="time-chart" class="" style="width: 90%;height:450px;"></div>
    </div>
    <div class="chart-for-stadium">
        <div id="stadium-chart" class="" style="width: 90%;height:450px;"></div>
    </div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChartForTime = echarts.init(document.getElementById('time-chart'));
            this.myChartForStadium = echarts.init(document.getElementById('stadium-chart'));
            this.initData();
        },
        props: ['sevenData', 'sevenDay', 'stadiums', 'stadiumBookingCount'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                const optionForTime = {
                    color: colors,
                    title: {
                        text: '7天内预约订单统计',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['预约订单数']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        // boundaryGap: false,
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: '订单数',
                          min: 0,
                          max: 50,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        {
                            name:'预约订单数',
                            type:'bar',
                            data:this.sevenData,
                            yAxisIndex: 0,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                    ]
              };
              const optionForStadiums = {
                    color: colors,
                    title: {
                        text: '各场馆预约订单统计',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['预约订单数']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        data: this.stadiums
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: '订单数',
                          min: 0,
                          max: 50,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        {
                            name:'预约订单数',
                            type:'bar',
                            data:this.stadiumBookingCount,
                            yAxisIndex: 0,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                    ]
              };
                this.myChartForTime.setOption(optionForTime);
                this.myChartForStadium.setOption(optionForStadiums);
            }
        },
        watch: {
            sevenData: function (){
                this.initData()
                
            },
            sevenDay: function (){
                this.initData()
            },
            stadiums: function () {
                this.initData()
                
            },
            stadiumBookingCount: function () {
                this.initData()
            }
            
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .chart-for-time{
        display: flex;
        justify-content: center;
    }
    .chart-for-stadium{
        display: flex;
        justify-content: center;
        margin-top: 5%;
    }
</style>
