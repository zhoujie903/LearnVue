Vue.filter('date',time=>moment(time).format('YY-MM--DD, HH:mm:ss'))
new Vue({
    el: '#notebook',
    created(){
        this.content = localStorage.getItem('content')
    },
    data(){
        return {
            content: '**This** is a not.',
            notes:JSON.parse(localStorage.getItem('notes'))||[],
            selectedId:localStorage.getItem('selected-id')||null,
        }
    },
    computed:{
        notePreview(){
            return this.selectedNote ? marked(this.selectedNote.content):''
        },
        addButtonTitle(){
            return this.notes.length + ' note(s) already'
        },
        selectedNote(){
            return this.notes.find(note=>note.id===this.selectedId)    
        },
        sortedNotes(){
            return this.notes.slice()
            .sort((a, b)=>a.created - b.created)
            .sort((a, b)=>(a.favorite === b.favorite)?0:a.favorite?-1:1)
        }
    },
    watch:{
        content: {
            handler:'saveNote'
        },
        notes:{
            handler:'saveNotes',
            deep:true,
        },
        selectedId(val){
            localStorage.setItem('selected-id',val)
        }
    },
    methods:{
        favoriteNote(){
            this.selectedNote.favorite ^= true
        },
        removeNote(){
            if (this.selectedNote && confirm('Delete the note?')) {
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index,1)
                }
            }
        },
        saveNotes(){
            localStorage.setItem('notes', JSON.stringify(this.notes))

        },
        selectNote(note){
            this.selectedId = note.id;
        },
        addNote(){
            const time = Date.now()
            const note = {
                id: String(time),
                title: 'New note'+(this.notes.length+1),
                content:'**Hi!** This notebook is using[markdown]()',
                created: time,
                favorite: false,
            }
            this.notes.push(note)
        },
        saveNote(){
            console.log('saving note:',this.content)
            localStorage.setItem('content', this.content)
            this.reportOperation('saving')
        },
        reportOperation(opName){
            console.log('the ',opName,' operation was completed!')
        }
    }
})