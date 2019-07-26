
import React from 'react'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteMahasiswa extends React.Component{
    constructor(props){
        super(props)
        this.state={
            formdata:{
                no:'',
                kode_mahasiswa:'',
                nama_mahasiswa:'',
                kode_agama:'',
                alamat:'',
                kode_jurusan:'',
                hobby:''

            }
        }
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    componentWillReceiveProps(newProps){
        let tmp = this.state.formdata
        alert("ini new props "+JSON.stringify(newProps.delete_mahasiswa[0]))
        if(newProps.delete_mahasiswa.length > 0){
            tmp.no = newProps.delete_mahasiswa[0].no
            tmp.kode_mahasiswa = newProps.delete_mahasiswa[0].kode_mahasiswa
            tmp.nama_mahasiswa = newProps.delete_mahasiswa[0].nama_mahasiswa
            tmp.kode_agama = newProps.delete_mahasiswa[0].kode_agama
            tmp.alamat = newProps.delete_mahasiswa[0].alamat
            tmp.kode_jurusan = newProps.delete_mahasiswa[0].kode_jurusan
            tmp.hobby = newProps.delete_mahasiswa[0].hobby
            this.setState({
                formdata:tmp
            })
        }
    }

    deleteHandler(){
        alert(this.state.formdata.kode_mahasiswa)
        alert("link "+apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA)
        alert("token "+ localStorage.getItem(apiconfig.LS.TOKEN))
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "delete",
            data : {kode_mahasiswa:this.state.formdata.kode_mahasiswa},
            headers:{
                "Authorization" : token
            }

        }
        axios(option)
        .then((response) => {
            alert(" masuk then "+JSON.stringify(response))
            this.props.getMahasiswa()
        })
        .catch((error)=>{
            alert(error)
        })
    }
    render(){
        // alert("ini this.props.view wekekek "+ this.props.view)
        return(
            <div class="modal fade" id="delete-modal-default">
                <div class="modal-dialog">
                    <div class="modal-content bg-warning">
                    <div class="modal-header">
                        <h4 class="modal-title">Delete {this.state.formdata.nama_mahasiswa} ?</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button"  onClick={this.deleteHandler} class="btn btn-outline-dark" data-dismiss="modal">Yes</button>
                        <button class="btn btn-outline-dark btn-danger"  data-dismiss="modal">No</button>
                    </div>
                    </div>
                
                 </div>
                
                </div>
            )
        }
        
    }

    export default DeleteMahasiswa
