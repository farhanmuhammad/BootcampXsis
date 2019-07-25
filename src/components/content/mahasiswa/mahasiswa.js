import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import ViewMahasiswa from './viewMahasiswa'
import DeleteMahasiswa from './deleteMahasiswa'
import CreateMahasiswa from './createMahasiswa'
import EditMahasiswa from './editMahasiswa'
import { Link } from 'react-router-dom'
import $ from 'jquery'



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
    getListMahasiswa(){ //dibuat async karena render bootstrap dulu
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option ={
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "get",
            headers: {
                "Authorization" : token
            }
        }
        axios(option)
        .then((response)=>{
            
            var dataset = [];
            response.data.message.map((row,id)=>{
        
        
            dataset.push([id+1,row.kode_mahasiswa,row.nama_mahasiswa,row.kode_agama,row.alamat,row.kode_jurusan,row.hobby]) //buattabel
            
            })
        this.setState({
            mahasiswa: dataset
        })
       
        })
        .catch((error)=>{
            alert(error)
        })
        
       
        
    }
    
    componentDidMount(){ // sebelum kerender halamannya datanya udah di get duluan
        this.getListMahasiswa()
    }
    async viewModalHandler(data){
        alert('masuk view modal handler '+data)
        
        // alert(JSON.stringify(tmp))
        await this.setState({
            currentMahasiswa : data,

        })
        // alert("ini current mahasiswa" +" "+ JSON.stringify(this.state.currentMahasiswa))
        // alert(this.state.currentMahasiswa)
        
    }

    async editModalHandler(data){
        // let tmp = {}
        // this.state.mahasiswa.map((row)=>{
        //     if(kode_mahasiswa == row.kode_mahasiswa){
        //         tmp = row
        //     }
        // })
        await this.setState({
            currentMahasiswa : data

        })

    }
    async deleteModalHandler(data){
        // alert('masuk delete'+kode_mahasiswa)

        // let tmp = {}
        // this.state.mahasiswa.map((row)=>{
        //     if(kode_mahasiswa == row.kode_mahasiswa){
        //         tmp = row
        //     }
        // })
        await this.setState({
            currentMahasiswa : data

        })
        alert("ini current mahasiswa delete "+ JSON.stringify(this.state.currentMahasiswa))
    }
    
    
    
     
    render(){
            var view = "<a href='#' class='editor_view'><span  class='btn fa fa-file-text-o' style={{ fontSize: '18px', paddingRight: '30px', color: '#1f3a93' }} data-toggle='modal' data-target='#modal-default'></span></a>"
            var edit = "<a href='#' class='editor_edit'><span  class='btn fa fa-edit' style={{ fontSize: '18px', paddingRight: '30px', color: '#1f3a93' }} data-toggle='modal' data-target='#edit-modal-default'></span></a>" 
            var del = "<a href='#' class='editor_del'><span  class='btn fa fa-trash' style={{ fontSize: '18px', paddingRight: '30px', color: '#1f3a93' }} data-toggle='modal' data-target='#delete-modal-default'></span></a>"
            
            var  table= window.$('#example2').DataTable({
            destroy: true,
            paging: true,
            dataSrc:"",
            data: this.state.mahasiswa,
            columns : [
                       {title: 'no'},
                       {title: 'kode_mahasiswa'},
                       {title: 'nama_mahasiswa'},
                       {title: 'kode_agama'},
                       {title: 'alamat'},
                       {title: 'kode_jurusan'},
                       {title: 'hobby'},
                       {defaultContent: view+edit+del}
                ],
            
                
            
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: true
        })
        var _=this
        window.$('#example2').on('click', 'a.editor_view', function (e) {
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            _.viewModalHandler(data)
           
        } );
        // var _=this
        window.$('#example2').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            _.editModalHandler(data)
           
        } );
        // var _=this
        window.$('#example2').on('click', 'a.editor_del', function (e) {
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            _.deleteModalHandler(data)
           
        } );

        


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
                        {/* <thead>
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
                        </thead> */}
                        
                    
                    </table>
                    </div>
                </div>
            </div>
            
            </div> 
            
            )
        }
        
    }
    
    
    export default Mahasiswa