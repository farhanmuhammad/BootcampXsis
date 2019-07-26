import React from 'react'

class ViewMahasiswa extends React.Component{
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
        

    

    }
    componentWillReceiveProps(newProps){
        
        let tmp = this.state.formdata
        alert("ini new props "+JSON.stringify(newProps.mahasiswa[0]))
        if(newProps.mahasiswa.length > 0){
            tmp.no = newProps.mahasiswa[0].no
            tmp.kode_mahasiswa = newProps.mahasiswa[0].kode_mahasiswa
            tmp.nama_mahasiswa = newProps.mahasiswa[0].nama_mahasiswa
            tmp.kode_agama = newProps.mahasiswa[0].kode_agama
            tmp.alamat = newProps.mahasiswa[0].alamat
            tmp.kode_jurusan = newProps.mahasiswa[0].kode_jurusan
            tmp.hobby = newProps.mahasiswa[0].hobby
            this.setState({
                formdata:tmp
            })
        }
        
        alert("ini form data : "+JSON.stringify(this.state.formdata))
        
    }
    
    render(){
        alert("ini this.props.view wekekek "+ JSON.stringify(this.props.mahasiswa))
        return(
            <div class="modal fade" id="modal-default">
                <div class="modal-dialog">
                    <div class="modal-content bg-warning">
                    <div class="modal-header">
                        <h4 class="modal-title">{this.state.formdata.nama_mahasiswa}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                    <form class="form-horizontal">
                        <div class ="box-body">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">kode mahasiswa</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.state.formdata.kode_mahasiswa}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Nama mahasiswa</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.state.formdata.nama_mahasiswa}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Agama</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.state.formdata.kode_agama}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Alamat</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.state.formdata.alamat}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Jurusan</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.state.formdata.kode_jurusan}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">hobby</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.state.formdata.hobby}/>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                
                 </div>
                
                </div>
            )
        }
        
    }

    export default ViewMahasiswa