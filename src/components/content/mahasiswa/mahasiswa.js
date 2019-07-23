import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import ViewMahasiswa from './viewMahasiswa'
import DeleteMahasiswa from './deleteMahasiswa'
import CreateMahasiswa from './createMahasiswa'
import EditMahasiswa from './editMahasiswa'
var $  = require( 'jquery' );




class Mahasiswa extends React.Component { 
    constructor(props){
        super(props)
        this.state={
            mahasiswa:[],
            currentMahasiswa:{},
            body:''
        }
        

        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.getListMahasiswa = this.getListMahasiswa.bind(this)

    }   
    async getListMahasiswa(){ //dibuat async karena render bootstrap dulu
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option ={
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "get",
            headers: {
                "Authorization" : token
            }
        }
        const response = await axios(option)
        this.setState({
            mahasiswa: response.data.message
        })
       
       
        
    }
    
    componentDidMount(){ // sebelum kerender halamannya datanya udah di get duluan
        this.getListMahasiswa()
    }
    async viewModalHandler(kode_mahasiswa){
        // alert(id)
        let tmp = {}
         alert(JSON.stringify(this.state.mahasiswa))
        this.state.mahasiswa.map((row)=>{
            // alert(id +" "+ row.id)
            if(kode_mahasiswa == row.kode_mahasiswa){
                tmp = row
            }
        })
        alert(JSON.stringify(tmp))
        await this.setState({
            currentMahasiswa : tmp,

        })
        alert("ini current mahasiswa" +" "+ JSON.stringify(this.state.currentMahasiswa))
        // alert(this.state.currentMahasiswa)
        
    }

    async editModalHandler(kode_mahasiswa){
        let tmp = {}
        this.state.mahasiswa.map((row)=>{
            if(kode_mahasiswa == row.kode_mahasiswa){
                tmp = row
            }
        })
        await this.setState({
            currentMahasiswa : tmp

        })

    }
    async deleteModalHandler(kode_mahasiswa){
        let tmp = {}
        this.state.mahasiswa.map((row)=>{
            if(kode_mahasiswa== row.kode_mahasiswa)
            {
                tmp = row
            }
        })
        await this.setState({
            currentMahasiswa : tmp
        })
        alert("ini current mahasiswa delete "+ JSON.stringify(this.state.currentMahasiswa))
    }
    
    
    
     
    render(){
        alert(JSON.stringify(this.state.mahasiswa))
        this.state.mahasiswa.map((row,id)=>{
            row.no = (id+1)
            // alert(row.kode_mahasiswa)
            // var actiondefault = "<a onClick=\""+  this.viewModalHandler(row.kode_mahasiswa) +"\"><span class='fa fa-file-text-o' style='fontSize: '18px', paddingRight: '30px', color: '#1f3a93'' data-toggle='modal' data-target='#modal-default'></span></a>"
            // row.action = actiondefault
            //"<link to='#'><span onClick={() => { this.viewModalHandler(row.id) }} class='fa fa-file-text-o' style={{ fontSize: '18px', paddingRight: '30px', color: '#1f3a93' }} data-toggle='modal' data-target='#modal-default'></span></link>"
            
        })
        window.$('#example2').DataTable({
            
            paging: true,
            data: this.state.mahasiswa,
            columns : [
                       {data: 'no'},
                       {data: 'kode_mahasiswa'},
                       {data: 'nama_mahasiswa'},
                       {data: 'kode_agama'},
                       {data: 'alamat'},
                       {data: 'kode_jurusan'},
                       {data: 'hobby'},
                       {data: 'action'}
            ],
            
            
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: true
        })
        


        return (
            
            <div>
                <ViewMahasiswa
                mahasiswa = {this.state.currentMahasiswa}
                />
                <CreateMahasiswa
                //  CreateMahasiswa // untuk manggil si create mahasiswa
                 getMahasiswa = {this.getListMahasiswa} // biar langsung reload
                />
                <DeleteMahasiswa
                    delete_mahasiswa = {this.state.currentMahasiswa}
                    getMahasiswa = {this.getListMahasiswa}
                />
                <EditMahasiswa
                    edit_mahasiswa = {this.state.currentMahasiswa}
                    getMahasiswa = {this.getListMahasiswa}
                /> 
                <section class = "content-header">
                    <ol class="breadcrumb">
                        <li><a href="/"><i class="">Home</i></a> <span class="">/</span></li>
                        <li class="active">List Mahasiswa</li>
            
                    </ol>
                </section>
            <div class="col-xs-12">
                <div class ='box box-primary'>
                <div class='box-header with-border'><center><h3>List Mahasiswa</h3></center></div>
                <div><button class="btn btn-primary" data-toggle="modal" data-target="#create-modal-default">Tambah Mahasiswa</button></div>
                <div class='box-body'>
                    <table id="example2" class="table table-bordered table-stripeds">
                        <thead>
                            <tr>
                                <th>no</th>
                                <th>Kode Mahasiswa</th>
                                <th>Nama Mahasiswa</th>
                                <th>Agama</th>
                                <th>Alamat</th>
                                <th>Jurusan</th>
                                <th>Hobby</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        
                    
                    </table>
                    </div>
                </div>
            </div>
            
            </div> 
            
            )
        }
        
    }
    
    
    export default Mahasiswa