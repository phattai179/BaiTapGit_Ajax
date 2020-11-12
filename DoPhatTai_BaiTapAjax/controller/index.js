
var mangNhanVien = [];
var validate = new Validation();

document.querySelector('#btnThemNhanVien').onclick = function (){
    var nv = new NhanVien();

    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoNhanVien = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    // Tạo 1 thẻ tagChucVu
    var tagChucVu = document.querySelector('#chucVu');
        // Tạo mảng các option trong thẻ select
        var arrOtion = tagChucVu.options;
        // Lấy vị trí của tại mảng đó của chức vụ gán cho nc.chucvu
    nv.chucVu = arrOtion[tagChucVu.selectedIndex].innerHTML;


    // Kiểm tra Validate
    var valid = true;
    // Kiểm tra rổng các ô input
    valid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '.kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, ' Tên nhân viên', '.kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '.kiemTraRong-luongCoBan') & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm', '.kiemTraRong-soGioLam');

    valid &= validate.kiemTraRongChucVu(tagChucVu, '.kiemTraRong-chucVu');

    // Kiểm tra định dạng tất cà là ký tự cho tenNhanVien
    valid &= validate.kiemTraKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien');

    // Kiểm tra định dạng tất cà là số
    valid &= validate.kiemTraTatCaLaSo(nv.luongCoBan, 'Lương cơ bản', '.kiemTraDinhDang-luongCoBan') & validate.kiemTraTatCaLaSo(nv.soGioLamTrongThang, 'Số giờ làm việc', '.kiemTraDinhSang-soGioLam')

    // Kiểm tra giá trị của lương cơ bản và số giờ làm viện
    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.soGioLamTrongThang, 'Số giờ làm', '.kiemTraGiaTri-soGioLam', 50, 150);

    // Kiểm tra độ dài của maNhanVien
    valid &= validate.kiemTraDoDai(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDai-maNhanVien', 4, 6);

    if(!valid){
        return;
    }
    console.log('nhân viên', nv);
    mangNhanVien.push(nv);
    
    renderTable(mangNhanVien);
    luuLocalstorage();
}

var renderTable = function (arrNV){
    var noiDungTable = '';
    for(var index = 0; index < arrNV.length; index++){
        //var nv = arrNV[index];

        var nhanVien = arrNV[index];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoNhanVien, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang);

        noiDungTable += 
        `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhLuong()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td><button class = "btn btn-danger" onclick = "xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
                <td><button class = "btn btn-primary" onclick = "chinhSua('${nv.maNhanVien}')">Chỉnh sửa</button></td>
            </tr>
        `
    }

    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}

var xoaNhanVien = function (maNV){
    alert(maNV)
    for(var index = mangNhanVien.length - 1; index >= 0; index--){
        var nv = mangNhanVien[index];
        if(nv.maNhanVien === maNV){
            mangNhanVien.splice(index, 1)
        }
    }

    renderTable(mangNhanVien);
}

var chinhSua = function(maNV){
    alert(maNV);
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnThemNhanVien').disabled = true;
    // Tạo một đối tượng sinh viên lấy để hiện thị các giá trị của nhân viên đang muốn chỉnh sửa cho nhân viên đó => để nhận biết

    // Chạy vòng lập nếu nhân viên nào có mã nhân viên trùng với nhân viên đang tạo thì ta hiển thị các trường dữ liệu để sửa
    for (var index = 0; index < mangNhanVien.length; index++){
        var nv = mangNhanVien[index];
        if(nv.maNhanVien === maNV){
            document.querySelector('#maNhanVien').value = nv.maNhanVien;
            document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
            document.querySelector('#chucVu').value = nv.heSoNhanVien;
            document.querySelector('#luongCoBan').value = nv.luongCoBan;
            document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
        }

    }
}


var luuLocalstorage = function(){
    // Tạo mảng mới để đổi mảng từ kiểu đối tượng sang chuỗi
    var newMangNhanVien = JSON.stringify(mangNhanVien);
    // Lưu mảng mới trên localstorage
    localStorage.setItem('newMangNhanVien', newMangNhanVien);
}

var inDuLieuLocalStorage = function (){
    // Kiểm tra trên localstorage có đang chứa giá trị không
    if(localStorage.getItem('newMangNhanVien')){
        // Tạo mạng mới gán cho giá trị lấy dc từ mảng localstorage
        var newMangNhanVien = localStorage.getItem('newMangNhanVien');
        // Chuyển đổi mảng lại từ chuỗi sang đối tượng
        mangNhanVien = JSON.parse(newMangNhanVien);
    }

    // In ra rederTable mangmoi
    renderTable(mangNhanVien);
}

// Gọi lại hàm in Dữ liệu để ớ ngoài để luôn luôn lưu lại dữ liệu
inDuLieuLocalStorage();

document.querySelector('#btnCapNhap').onclick = function (){
    // Tạo một nhân viên mới để lấy giá trị chỉnh sửa
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoNhanVien = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    // Chạy vòng lập để kiểm tra lại mã nhân viên
    for (var index = 0; index < mangNhanVien.length; index++){
        var nhanVienCapNhat = mangNhanVien[index];
        if(nhanVienCapNhat.maNhanVien === nv.maNhanVien){
            nhanVienCapNhat.maNhanVien = nv.maNhanVien;
            nhanVienCapNhat.tenNhanVien = nv.tenNhanVien;
            nhanVienCapNhat.heSoNhanVien = nv.heSoNhanVien;
            nhanVienCapNhat.luongCoBan = nv.luongCoBan;
            nhanVienCapNhat.soGioLamTrongThang = nv.soGioLamTrongThang;
            nhanVienCapNhat.chucVu = nv.chucVu;
        }

        renderTable(mangNhanVien);
        luuLocalstorage();
        document.querySelector('#maNhanVien').disabled = false;
        document.querySelector('#btnThemNhanVien').disabled = false;
    }
}