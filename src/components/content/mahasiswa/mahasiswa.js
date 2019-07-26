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
        // this.editModalHandler = this.editModalHandler.bind(this)
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
        
        
            // dataset.push({'no':(id+1),'kode_mahasiswa':row.kode_mahasiswa,'nama_mahasiswa':row.nama_mahasiswa,'kode_agama':row.kode_agama,'alamat':row.alamat,'kode_jurusan':row.kode_jurusan,'hobby':row.hobby}) //buattabel
            dataset.push([id+1,row.kode_mahasiswa,row.nama_mahasiswa,row.kode_agama,row.alamat,row.kode_jurusan,row.hobby])
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
    viewModalHandler(data){
        // alert('ini data '+ JSON.stringify(data))
        // alert(data.kode_mahasiswa)
        // let tmp = {}
        // this.state.mahasiswa.map((row)=>{
        //     // alert("ini kode mahasiswa "+row.kode_mahasiswa)
        //     if(data.kode_mahasiswa == row.kode_mahasiswa){
        //         tmp = row
        //     }
        // })
        let tmp=[]
        tmp.push({'no':data[0],'kode_mahasiswa':data[1],'nama_mahasiswa':data[2],'kode_agama':data[3],'alamat':data[4],'kode_jurusan':data[5],'hobby':data[6]})

        this.setState({
            currentMahasiswa : tmp

        })
        alert(JSON.stringify(this.state.currentMahasiswa))
        
    }

    editModalHandler(data){
        // let tmp = {}
        // this.state.mahasiswa.map((row)=>{
        //     if(data.kode_mahasiswa == row.kode_mahasiswa){
        //         tmp = row
        //     }
        // })
        let tmp=[]
        tmp.push({'no':data[0],'kode_mahasiswa':data[1],'nama_mahasiswa':data[2],'kode_agama':data[3],'alamat':data[4],'kode_jurusan':data[5],'hobby':data[6]})

        this.setState({
            currentMahasiswa : tmp

        })
        alert(JSON.stringify(this.state.currentMahasiswa))

    }
    deleteModalHandler(data){
        // alert('masuk delete'+kode_mahasiswa)
        // alert(data.kode_mahasiswa)
        // let tmp = {}
        // this.state.mahasiswa.map((row)=>{
        //     if(data.kode_mahasiswa == row.kode_mahasiswa){
        //         tmp = row
        //     }
        // })
        // this.setState({
        //     currentMahasiswa : data

        // })
        // alert("ini current mahasiswa delete "+ JSON.stringify(this.state.currentMahasiswa))
        let tmp=[]
        tmp.push({'no':data[0],'kode_mahasiswa':data[1],'nama_mahasiswa':data[2],'kode_agama':data[3],'alamat':data[4],'kode_jurusan':data[5],'hobby':data[6]})

        this.setState({
            currentMahasiswa : tmp

        })
        alert(JSON.stringify(this.state.currentMahasiswa))
    }
    
    
    
     
    render(){
            var view = "<a href='' class='editor_view'><span  class='btn fa fa-file' style={{ fontSize: '18px', paddingRight: '30px', color: '#1f3a93' }} data-toggle='modal' data-target='#modal-default'></span></a>"
            var edit = "<a href='' class='editor_edit'><span  class='btn fa fa-edit' style={{ fontSize: '18px', paddingRight: '30px', color: '#1f3a93' }} data-toggle='modal' data-target='#edit-modal-default'></span></a>" 
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
                       {data: null,
                        title: 'action',
                        defaultContent: view+edit+del}
                ],
            
                
            
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: true
        })
        var _=this
        window.$('#example2').on('click', 'a.editor_view', function (e) {
            // alert('test view')
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            alert('ini data view jquery '+JSON.stringify(data))
            if(data){
                _.viewModalHandler(data)
            }
            
            
           
        } );
        
        window.$('#example2').on('click', 'a.editor_edit', function (e) {
            alert('test edit')
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            alert('ini data edit '+JSON.stringify(data))
            if(data){
            _.editModalHandler(data)
            }
        } );
        // var _=this
        window.$('#example2').on('click', 'a.editor_del', function (e) {
            alert('test delet')
            e.preventDefault();
           
            var data = table.row( $(this).parents('tr') ).data();
            alert('ini data delete '+JSON.stringify(data))
            if(data){
                _.deleteModalHandler(data)
                }
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
                        </thead>     */}
                    </table>
                    </div>
                </div>
            </div>
            
            </div> 
            
            )
        }
        
    }
    
    
    export default Mahasiswa