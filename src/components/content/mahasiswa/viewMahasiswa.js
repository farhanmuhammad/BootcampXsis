import React from 'react'

class ViewMahasiswa extends React.Component{
    render(){
        // alert("ini this.props.view wekekek "+ this.props.view)
        return(
            <div class="modal fade" id="modal-default">
                <div class="modal-dialog">
                    <div class="modal-content bg-warning">
                    <div class="modal-header">
                        <h4 class="modal-title">{this.props.mahasiswa.nama_mahasiswa}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                    <form class="form-horizontal">
                        <div class ="box-body">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">kode mahasiswa</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.props.mahasiswa.kode_mahasiswa}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Nama mahasiswa</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.props.mahasiswa.nama_mahasiswa}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Agama</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.props.mahasiswa.kode_agama}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Alamat</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.props.mahasiswa.alamat}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">Jurusan</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.props.mahasiswa.kode_jurusan}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-3 control-label">hobby</label>

                                <div class="col-sm-9 ">
                                <input readOnly class="form-control" value={this.props.mahasiswa.hobby}/>
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