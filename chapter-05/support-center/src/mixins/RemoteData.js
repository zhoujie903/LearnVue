export default function (resources) {
    return {
        data(){
            let initData = {
                remoteDataLoading:0,
            }
            initData.remoteErrors = {}
            for (const key in resources) {
                initData[key] = null
                initData.remoteErrors[key]=null
            }
            return initData 
        },

        methods: {
            async fetchResource(key, url) {
                this.$data.remoteDataLoading++
                this.$data.remoteErrors[key]=null
                try {
                    this.$data[key] = await this.$fetch(url)    
                } catch (e) {
                    console.error(e)
                    this.$data.remoteErrors[key] = e
                }
                this.$data.remoteDataLoading--    
            }
        },

        created () {
            for (const key in resources) {
                let url = resources[key];
                if (typeof url === 'function') {
                    this.$watch(url, (val)=>{
                        this.fetchResource(key,val)
                    },{
                        immediate: true
                    })
                } else {
                    this.fetchResource(key,url)
                }
            }
        },

        computed: {
            remoteDataBuse() {
                return this.$data.remoteDataLoading !==0 
            },

            hasRemoteErrors(){
                return Object.keys(this.remoteErrors).some(key => this.$data.remoteErrors[key])
            }
        }
    }
}