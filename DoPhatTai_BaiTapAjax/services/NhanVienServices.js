var NhanVienService = function(){
    this.layDanhSachNhanVien = function(){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
            method: 'GET',
        })
        return promise;
    }

    this.themNhanVien = function(nv){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nv, 
        })
        return promise;
    }

    this.xoaNhanVien = function(maNV){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNV,
            method: 'DELETE',
        })
        return promise;
    }

    this.suaNhanVien = function(maNV){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNV,
            method: 'GET',
        })
        return promise;
    }

    this.capNhatThongTinNhanVien = function(nv, maNV){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + maNV,
            method: 'PUT',
            data: nv,
        })
        return promise;
    }
}