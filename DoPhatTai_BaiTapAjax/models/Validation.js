var Validation = function(){
    this.kiemTraRong = function(value, name, idThongBao){
        if(value.trim() === ''){
            document.querySelector(idThongBao).innerHTML = name + ' không được bỏ trống';
            return false;
        }
        document.querySelector(idThongBao).innerHTML = '';
        return true;
    }

    this.kiemTraKyTu = function(value, name, idThongBao){
        var regexKyTu = /^[A-Za-z ]+$/;
        if(!regexKyTu.test(value)){
            document.querySelector(idThongBao).innerHTML = name + ' tất cả phải là chữ'
            return false;
        }
        document.querySelector(idThongBao).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaLaSo = function(value, name, idThongBao){
        var regexNumber = /^[0-9]+$/;
        if(!regexNumber.test(value)){
            document.querySelector(idThongBao).innerHTML = name + ' tất cả phải là số';
            return false;
        }else{
            document.querySelector(idThongBao).innerHTML = '';
            return true;
        }
    }

    this.kiemTraGiaTri = function(value, name, idThongBao, minValue, maxValue){
        if(Number(value) < minValue || Number(value) > maxValue){
            document.querySelector(idThongBao).innerHTML = name + ` phải có giá trị từ ${minValue} - ${maxValue}`;
            return false;
        }
        document.querySelector(idThongBao).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai = function(value, name, idThongBao, minValue, maxValue){
        if(value.trim().length < minValue || value.trim().length > maxValue){
            document.querySelector(idThongBao).innerHTML = name + ` phải có độ dài từ ${minValue} - ${maxValue}`;
            return false;
        }
        document.querySelector(idThongBao).innerHTML = '';
        return true;
    }
}