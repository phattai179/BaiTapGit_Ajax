
var validate = new Validation();
var nvServices = new NhanVienService();

var layDanhSachNhanVienAPI = function () {
    // Tạo 1 đối tượng promise để lấy dữ liệu trả về từ backend
    var promise = nvServices.layDanhSachNhanVien();

    // Hàm trả xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        rederTable(result.data);
    })

    // Hàm xử lý thất bại
    promise.catch(function (error) {
        console.log(error);
    })

    console.log('123')
}

layDanhSachNhanVienAPI();

// Tạo bảng

var rederTable = function (mangNhanVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangNhanVien.length; i++) {
        var nv = new NhanVien();
        nv.maNhanVien = mangNhanVien[i].maNhanVien;
        nv.tenNhanVien = mangNhanVien[i].tenNhanVien;
        nv.heSoChucVu = mangNhanVien[i].heSoChucVu;
        nv.luongCoBan = mangNhanVien[i].luongCoBan;
        nv.soGioLamTrongThang = mangNhanVien[i].soGioLamTrongThang;
        nv.chucVu = mangNhanVien[i].chucVu;

        noiDungTable += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhLuong()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button class = "btn btn-danger" onclick = "xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
                    <button class = "btn btn-primary" onclick = "suaNhanVien('${nv.maNhanVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
    }

    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

// Chức năng thêm nhân viên

document.querySelector('#btnThemNhanVien').onclick = function () {

    var nv = new NhanVien();

    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;


    var tagChucVu = document.querySelector('#chucVu');
    // Tạo 1 mảng chứa các giá trị của otions
    var arrOtion = tagChucVu.options;

    nv.chucVu = arrOtion[tagChucVu.selectedIndex].innerHTML;


    // Kiểm tra validate
    var valid = true;

    // Kiểm tra rổng
    valid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '.kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '.kiemTraRong-luongCoBan') & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm việc trong tháng', '.kiemTraRong-soGioLam');

    // Kiểm tra ten nhan viên là chữ 
    valid &= validate.kiemTraKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien');

    // Kiểm tra tất cả là số 
    valid &= validate.kiemTraTatCaLaSo(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDinhDang-maNhanVien') & validate.kiemTraTatCaLaSo(nv.luongCoBan, 'Lương cơ bản', '.kiemTraDinhDang-luongCoBan') & validate.kiemTraTatCaLaSo(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '.kiemTraDinhDang-soGioLam')

    // Kiểm tra giá trị của lương cơ bản và số giờ làm
    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.soGioLamTrongThang, 'Số giờ làm ', '.kiemTraGiaTri-soGioLam', 50, 150); 

    // Kiểm tra độ dài mã nhân viên
    valid &= validate.kiemTraDoDai(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDai-maNhanVien', 4, 6);

    if(!valid){
        return;
    }

    // Tạo 1 đối tượng nhận dữ liệu trả về từ backend

    var promise = nvServices.themNhanVien(nv);

    // Hàm xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienAPI();
    })

    // Hàm xử lý thất bại 
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

var xoaNhanVien = function(maNV){
    alert(maNV);

    var promise = nvServices.xoaNhanVien(maNV);

    promise.then(function(result){
        console.log(result.data);
        layDanhSachNhanVienAPI();
    })

    promise.catch(function(error){
        console.log(error.response.data);
    })
}

// Chức năng sửa nhân viên

var suaNhanVien = function(maNV){
    alert(maNV);
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnThemNhanVien').disabled = true;

    var promise = nvServices.suaNhanVien(maNV);

    // Hàm xử lý thành công
    promise.then(function(result){
        console.log(result.data);
        var nv = result.data;

        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.heSoChucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
    })

    // Hàm xử lý thất bại 

    promise.catch(function(error){
        console.log(error.response.data);
    })
}

// Chức năng cập nhật lại thông tin nhân viên

document.querySelector('#btnCapNhap').onclick = function(){
    var nv = new NhanVien();

    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var tagChucVu = document.querySelector('#chucVu');
    // Tạo mảng các thẻ option
    var arrOtion = tagChucVu.options;

    nv.chucVu = arrOtion[tagChucVu.selectedIndex].innerHTML;

    var promise = nvServices.capNhatThongTinNhanVien(nv, nv.maNhanVien);

    promise.then(function(result){
        console.log(result.data);
        layDanhSachNhanVienAPI();
    })

    promise.catch(function(error){
        console.log(error.response.data);
    })

    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#btnThemNhanVien').disabled = false;
}