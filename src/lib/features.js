function APIfeartures(query, queryString) {
    this.query = query; // câu truy vấn vào database
    this.queryString = queryString; // câu truy vấn trên url

    // Hàm tác vụ phân trang
    this.paginating = () => {
        // Vì req.query trả về một đối tượng mà các giá trị trong đó đều là kiểu string
        // để chuyển từ string sang dạng number ta nhân với 1
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;

        // limit(x) là LẤY RA x sản phẩm đầu tiên
        // skip(x) là BỎ QUA x sản phẩm đầu tiên
        // khi chuyển trang ta hiện các sản phẩm liên tiếp nhau ta có công thức:
        // skip = limit * (page - 1)
        let skip = limit * (page - 1);
        this.query = this.query.limit(limit).skip(skip);

        return this;
    }

    this.sorting = () => {
        const sort = this.queryString.sort || '-createdAt';

        this.query = this.query.sort(sort);

        return this;
    }

    this.searching = () => {
        const search = this.queryString.search;

        if (search) {
            this.query = this.query.find({
                $text: {
                    $search: search
                }
            })
        } else {
            this.query = this.query.find();
        }

        return this;
    }

    // hàm tác vụ lọc
    // [gt] : lớn hơn
    // [gte] : lớn hơn hoặc bằng
    // [lt] : bé hơn
    // [lte] : bé hơn hoặc bằng
    // [regex] : chính xác (dùng với chuỗi)
    this.filtering = () => {
        const queryObj = { ...this.queryString };

        // loại bỏ các từ khóa của các chức năng khác trong queryObj
        const excludedFields = ['page', 'sort', 'limit', 'search'];
        excludedFields.forEach((value) => {
            return delete (queryObj[value])
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, (match) => {
            return '$' + match;
        })

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
};
module.exports = APIfeartures;