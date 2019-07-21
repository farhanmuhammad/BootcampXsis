import React from 'react'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'


class CreateMahasiswa extends React.Component{
    constructor (props){
        super(props)
        this.state={
            formdata:{
                kode_mahasiswa:'',
                nama_mahasiswa:'',
                kode_agama:'',
                alamat:'',
                kode_jurusan:''
            }
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    changeHandler(e){ // untuk bisa ngisi form
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){ // handler submitnya
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option ={
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method : "post",
            headers: {
                "Authorization": token
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{ //jika berhasil submit jalanin ini
            if(response.data.code === 200){
                alert('Success')
                this.props.getMahasiswa()
            }
            else{
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }
    render(){
        return(<div class="modal fade" id="create-modal-default">
        <div class="modal-dialog">
            <div class="modal-content bg-warning">
            <div class="modal-header">
                <h4 class="modal-title">Tambah Mahasiswa</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
            <form class="form-horizontal">
                <div class ="box-body">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">kode mahasiswa</label>

                        <div class="col-sm-9 ">
                        <input type="text" class="form-control" 
                        name="kode_mahasiswa"
                        value={this.state.formdata.kode_mahasiswa} 
                        onChange={this.changeHandler} required/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Nama mahasiswa</label>

                        <div class="col-sm-9 ">
                        <input type="text"class="form-control"
                        name ="nama_mahasiswa" 
                        value={this.state.formdata.nama_mahasiswa} 
                        onChange={this.changeHandler} required/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Agama</label>

                        <div class="col-sm-9 ">
                        <input type="text"class="form-control" 
                        name ="kode_agama"
                        value={this.state.formdata.kode_agama} 
                        onChange={this.changeHandler}
                        />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Alamat</label>

                        <div class="col-sm-9 ">
                        <input type="text"class="form-control"
                        name="alamat" 
                        value={this.state.formdata.alamat} 
                        onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Jurusan</label>

                        <div class="col-sm-9 ">
                        <input type="text"class="form-control"
                        name ="kode_jurusan" 
                        value={this.state.formdata.kode_jurusan} 
                        onChange={this.changeHandler}/>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-primary" onClick={this.submitHandler} data-dismiss="modal" >Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">close</button>
            </div>
            </div>
        
         </div>
        
        </div>
        )
    }
}

export default CreateMahasiswa