<template>
    <v-chart ref="mychart" v-if="motionData" @zr:click="chartClickHandler" class="chart" :option="option" />
    <div v-else> データなし</div>
    
</template>

<script>
import "echarts"
import DataService from '../services/data.service';
import RestDataService from '../services/restData.service';




export default {

    props: [
        'empId',
        'pickedDate',
    ],
    data() {
        return {


            motionData: null,
            points: ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00', '11:10', '11:20', '11:30', '11:40', '11:50', '12:00','12:10', '12:20', '12:30','12:40','12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:20','15:30','15:40','15:50', '16:00', '16:10','16:20','16:30','16:40','16:50','17:00'],
            option: {
                /*
                title: {
                  text: 'Stacked Line'
                },*/
                tooltip: {
                    trigger: 'axis',

                },
                /*
                legend: {
                  data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },*/

                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true,
                    clickable: true
                },


                toolbox: {
                    show: true,
                },
                xAxis: [{
                    //type: 'category',
                    //nameLocation: 'middle',
                    boundaryGap: false,
                    triggerEvent: true,
                    data: ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00', '11:10', '11:20', '11:30', '11:40', '11:50', '12:00','12:10', '12:20', '12:30','12:40','12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:20','15:30','15:40','15:50', '16:00', '16:10','16:20','16:30','16:40','16:50','17:00']
                }, {
                    show: false,
                    type:'time',
                    boundaryGap: ["0%", "0%"],
                }
            
            ],
                yAxis: {
                    //type: 'value',
                    //axisLabel: {
                    //formatter: '{value}'
                    //},

                    //axisPointer: {
                    // snap: true
                    //}
                },
                visualMap: {
                    type: 'piecewise',
                    show: false,
                    dimension: 0,
                    seriesIndex: 0,
                },
                series: [
                    {
                        name: 'マウスクリック',
                        triggerLineEvent: true,
                        type: 'line',

                        smooth: true,
                        stack: 'Total',
                        data: [],
                        triggerLineEvent: true
                    },
                    {
                        triggerLineEvent: true,
                        name: 'キーボードクリック',
                        type: 'line',
                        stack: 'Total',
                        data: [],
                        triggerLineEvent: true


                    },
                    {
                        triggerLineEvent: true,
                        name: 'マウス移動',
                        type: 'line',
                        stack: 'Total',
                        data: [],
                        triggerLineEvent: true

                    },
                    

                    {
                        name: '休憩',
                        type: 'line',
                        stack: 'Total',
                        xAxisIndex: 1,
                        markArea: {
                            itemStyle: {
                                color: 'rgba(255, 173, 177, 0.4)'
                            },
                            xAxisIndex: 1,

                            data: [
                                [

                                    {
                                        name: '休憩時間',
                                        xAxis: new Date('2019-10-11').getTime(),
                                    },
                                    {
                                        xAxis: new Date('2019-10-13').getTime(),
                                    }

                                ]
                            ],
                        }
                    }
                ],
            }
        }
    },

    computed: {
    },

    watch: {
        // whenever question changes, this function will run
        pickedDate() {
            this.updateChart()
        },
        empId() {
            this.updateChart()
        }
    },


    methods: {
        chartClickHandler(params) {

            console.log(params)

            const myChart = this.$refs.mychart;

            var pointInPixel = [params.offsetX, params.offsetY];
            var pointInGrid = myChart.convertFromPixel('grid', pointInPixel);

            console.log(this.points[pointInGrid[0]])

            this.$router.push({name:'Employee-image-id', params: {id: this.empId} , query: { ...this.$route.query, pickedDate: this.pickedDate.getTime(), pickedTimeSlot:this.points[pointInGrid[0]].slice(0, 2) } })

        },
        makeSeq(dataO) {



            let seqO = {}

            this.points.forEach( x => seqO[x] = 0 )

            dataO.forEach(x => {
                this.points.every(p => {

                    if (x.hour.toString().padStart(2, '0') + ':' + x.minute.toString().padStart(2, '0') < p) {


                        if (seqO[p]) {
                            seqO[p] = seqO[p] + x.motionData
                        } else {
                            seqO[p] = x.motionData
                        }
                        return false
                    } else {

                        return true

                    }

                })
            })

            return seqO

        },
        updateChart() {
            if (!this.empId || !this.pickedDate)
                return


            DataService.seachEmpIdData(this.empId, this.pickedDate.toLocaleString('sv').slice(0, 10)).then(res => {

                let seqC = []

                let seqK = []

                let seqM = []


                if (res.data._embedded.motionData.length==0){
                    this.motionData = null
                    return
                }


                this.motionData = res.data._embedded.motionData
                const allData = res.data._embedded.motionData.map(x => {

                    const d = new Date(x.motionDataDatetime);


                    x.hour = d.getHours()

                    x.minute = d.getMinutes()

                    return x

                })


                const dataC = allData.filter(val => val.sectionCode == 'c');


                seqC = this.makeSeq(dataC)


                const dataM = allData.filter(val => val.sectionCode == 'm');


                seqM = this.makeSeq(dataM)

                const dataK = allData.filter(val => val.sectionCode == 'k');

                seqK = this.makeSeq(dataK)

                this.option.series[0].data = Object.values(seqC)
                this.option.series[1].data = Object.values(seqK)
                this.option.series[2].data = Object.values(seqM)

                //this.option.series[3].data = [ [this.pickedDate.setHours(9), 0.0], [this.pickedDate.setHours(17), 0.0]]

                console.log("option", this.option)



            })

            RestDataService.seachEmpIdData(this.empId, this.pickedDate.toLocaleString('sv').slice(0, 10)).then(res => {
                console.log("res2", res)


                let min = new Date(this.pickedDate.getTime()).setHours(9)

                let max = new Date(this.pickedDate.getTime()).setHours(17)



                this.option.xAxis[1].min = min
                this.option.xAxis[1].max = max

                const restData = []

                res.data._embedded.restTime.forEach( restTime=> {

                    console.log('rest.startTime', restTime)
                    restData.push([{xAxis: new Date(restTime.startTime)}, {xAxis: new Date(restTime.endTime)}])

                    })

                console.log('restData', restData)
                this.option.series[3].markArea.data = restData
            })
        }
    },



    mounted() {
        this.updateChart()
    }
}

</script>