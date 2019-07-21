import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import ViewMahasiswa from './viewMahasiswa'
import DeleteMahasiswa from './deleteMahasiswa'
import CreateMahasiswa from './createMahasiswa'
import EditMahasiswa from './editMahasiswa'

import { Link } from 'react-router-dom';
import DeletMahasiswa from './deleteMahasiswa.js';


class Mahasiswa extends React.Component { 
    constructor(props){
        super(props)
        this.state={
            mahasiswa:[],
            currentMahasiswa:{}
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
    async viewModalHandler(id){
        // alert(id)
        let tmp = {}
         alert(JSON.stringify(this.state.mahasiswa))
        this.state.mahasiswa.map((row)=>{
            // alert(id +" "+ row.id)
            if(id == row.id){
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
                                <th>No</th>
                                <th>Kode Mahasiswa</th>
                                <th>Nama Mahasiswa</th>
                                <th>Agama</th>
                                <th>Alamat</th>
                                <th>Jurusan</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            
                            this.state.mahasiswa.map((row,x)=>
                                <tr>
                                    
                                    <td>{x+1}</td>
                                    <td>{row.kode_mahasiswa}</td>
                                    <td>{row.nama_mahasiswa}</td>
                                    <td>{row.kode_agama}</td>
                                    <td>{row.alamat}</td>
                                    <td>{row.kode_jurusan}</td>
                                    <td>
                                        <Link to='#'>
                                        
                                        <span onClick= {()=> {this.viewModalHandler(row.id)}} class='fa fa-book' style={{fontSize: '18px', paddingRight:'30px' }} data-toggle="modal" data-target="#modal-default"></span>
                                        <span onClick= {()=> {this.editModalHandler(row.kode_mahasiswa)}} class='fa fa-edit' style={{fontSize: '18px', paddingRight:'30px'}}data-toggle="modal" data-target="#edit-modal-default"></span>
                                        <span onClick= {()=> {this.deleteModalHandler(row.kode_mahasiswa)}} class='fa fa-trash' style={{fontSize: '18px', paddingRight:'30px'}}data-toggle="modal" data-target="#delete-modal-default"></span>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
            
            </div> 
            
            )
        }
        
    }
    
    
    export default Mahasiswa