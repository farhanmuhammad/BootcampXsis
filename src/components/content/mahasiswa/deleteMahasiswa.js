
import React from 'react'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteMahasiswa extends React.Component{
    constructor(props){
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    deleteHandler(){
        alert(this.props.delete_mahasiswa.kode_mahasiswa)
        alert("link "+apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA)
        alert("token "+ localStorage.getItem(apiconfig.LS.TOKEN))
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "delete",
            data : {kode_mahasiswa:this.props.delete_mahasiswa[1]},
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
                        <h4 class="modal-title">Delete {this.props.delete_mahasiswa[2]} ?</h4>
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
