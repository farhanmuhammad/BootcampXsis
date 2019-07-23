import React from 'react'
import axios from 'axios';
import apiconfig from '../../../configs/api.config.json'
class EditMahasiswa extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formdata:{
                kode_mahasiswa: '',
                nama_mahasiswa: '',
                alamat: '',
                kode_agama: '',
                kode_jurusan: '',
                hobby: []
            },
            hobbyList:[
            {name: 'baca', isChecked: false},
            {name: 'nyanyi', isChecked: false},
            {name: 'berenang', isChecked: false},
            {name: 'jogging', isChecked: false},
            {name: 'kayang', isChecked: false}    
            ],
            hobbyListBefore:[]
           
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    
    
    componentWillReceiveProps(newProps) {
       
        this.setState({
            formdata: newProps.edit_mahasiswa
        })
        this.state.hobbyList.map((row,i)=>{

            row.isChecked = false;
        })
        if(newProps.edit_mahasiswa.hobby){ // check ada hooby apa negga
           this.state.hobbyList.map((row,x)=>{ // looping semua hoobby list
               newProps.edit_mahasiswa.hobby.split(',').map((row2,i)=>{ //misahin hooby dari database dan looping
                   if(row.name.toLowerCase()==row2.trim()) // chech apakah hooby 1 sama dengan hooby dari tadibase
                   {
                       row.isChecked= true;
                   }
               })
           })
        }
        // alert(JSON.stringify(this.state.hobbyList))
    }
    changeHandler(e) {

        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })

    }
    onAddingItem = (i) =>(event)=> {
      
        this.setState((state) => {
          state.hobbyList[i].isChecked = !state.hobbyList[i].isChecked; // ngerubah tidak check jadi check
          return {
            hobbyList: state.hobbyList  
          }

        })
        // alert(JSON.stringify(this.state.hobbyList))
      }

    submitHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let trueHobby = this.state.hobbyList.filter(row => row.isChecked ===true)
        let strHobby =''
        trueHobby.map((row,i)=>{
            strHobby=strHobby+row.name+','
        })
        this.state.formdata.hobby=strHobby.substring(0,strHobby.length-1)
        let option ={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "put",
            headers:{
                "Authorization": token
            },
            data: this.state.formdata
        }
        axios(option)
        .then ((response) =>{
            if(response.data.code === 200){
                alert('success')
                this.props.getMahasiswa()
            }else{
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })    
    
    }
    
    render(){


        return( <div class="modal fade" id="edit-modal-default">
                <div class="modal-dialog">
                    <div class="modal-content bg-warning">
                    <div class="modal-header">
                        <h4 class="modal-title">{this.props.edit_mahasiswa.nama_mahasiswa}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                    <form class="form-horizontal">
                        <div class ="box-body">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">kode mahasiswa</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control"
                                name="kode_mahasiswa" 
                                value={this.state.formdata.kode_mahasiswa}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Nama mahasiswa</label>

                                <div class="col-sm-9 ">
                                <input  class="form-control"
                                name="nama_mahasiswa"
                                onChange={this.changeHandler} 
                                value={this.state.formdata.nama_mahasiswa}
                                />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Agama</label>

                                <div class="col-sm-9 ">
                                <input  class="form-control"
                                name="kode_agama"
                                onChange={this.changeHandler} 
                                value={this.state.formdata.kode_agama}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Alamat</label>

                                <div class="col-sm-9 ">
                                <input  class="form-control"
                                name ="alamat"
                                onChange={this.changeHandler}  
                                value={this.state.formdata.alamat}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Jurusan</label>

                                <div class="col-sm-9 ">
                                <input  class="form-control"
                                 name="kode_jurusan"
                                 onChange={this.changeHandler} 
                                 value={this.state.formdata.kode_jurusan}/>
                                </div>
                            </div>
                            <div class="form-group"></div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Hobby</label>
                                <div class="col-sm-9">
                                {this.state.hobbyList.map((hob,i)=>{
                                 return(
                                      <div class ="input-group mb-3 input-group-sm col-sm-3">
                                      <label for="text"> 
                                      <input type="checkbox" value={hob.name} checked={hob.isChecked} onChange={this.onAddingItem(i)}/> {hob .name}

                                       </label>
                                       </div>
                                    )
                                })}            
                                </div>      
                            </div>
                            
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-dark" data-dismiss="modal"  onClick={this.submitHandler}>Update</button>
                        <button type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                
                 </div>
                
                </div>)
    }
}


export default EditMahasiswa