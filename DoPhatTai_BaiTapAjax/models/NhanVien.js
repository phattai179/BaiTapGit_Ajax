var NhanVien = function(maNV, tenNV, chucVu, heSoChucVu, luongCoBan,soGioLamTrongThang ){
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = chucVu;
    this.heSoChucVu = heSoChucVu;
    this.luongCoBan = luongCoBan;
    this.soGioLamTrongThang = soGioLamTrongThang;

    this.tinhLuong = function(){
        var luong = (this.heSoChucVu * this.luongCoBan);
        return luong;
    }

    this.xepLoai = function(){
        if(this.soGioLamTrongThang >= 120){
            return 'Xuất sắc';
        }else if(this.soGioLamTrongThang < 120 && this.soGioLamTrongThang >= 100){
            return 'Giỏi';
        }else if(this.soGioLamTrongThang < 100 && this.soGioLamTrongThang >= 80) {
            return 'Khá';
        }else if(this.soGioLamTrongThang < 80 && this.soGioLamTrongThang >= 50){
            return 'Trung bình';
        }
    }

}