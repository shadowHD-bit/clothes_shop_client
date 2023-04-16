import {
  fetchBrandExcel,
  fetchOrderExcel,
  fetchProductExcel,
  fetchRemnantsExcel,
  fetchTypeExcel,
  fetchUserExcel,
} from "../../http/excelAPI";
import * as XLSX from "xlsx";
import { dateParse } from "./dateParse.helpers";

export const getProductDataExcel = () => {
  fetchProductExcel().then((data) => {
    data.rows.forEach(function (element) {
      element.Бренд = element.brand.name;
      element.Тип = element.type.name;
      delete element.brand;
      delete element.type;
    });

    if (data) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data.rows);
      XLSX.utils.book_append_sheet(wb, ws, "Product");
      XLSX.writeFile(wb, "ProductExcel.xlsx");
    }
  });
};

export const getBrandDataExcel = () => {
  fetchBrandExcel().then((data) => {
    data.forEach(function (element) {
      element.Дата_создания = dateParse(element.Дата_добавления);
      delete element.Дата_добавления;
    });

    if (data) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Brands");
      XLSX.writeFile(wb, "BrandExcel.xlsx");
    }
  });
};

export const getTypeDataExcel = () => {
  fetchTypeExcel().then((data) => {
    data.forEach(function (element) {
      element.Дата_создания = dateParse(element.Дата_добавления);
      delete element.Дата_добавления;
    });

    if (data) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Types");
      XLSX.writeFile(wb, "TypeExcel.xlsx");
    }
  });
};

export const downloadPatternProductExcel = () => {
  let data = [
    {
      name: "",
      price: "",
      productBrandId: "",
      productTypeId: "",
      description: "",
    },
  ];
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Product");
  XLSX.writeFile(wb, "ProductPattern.xlsx");
};

export const getUserDataExcel = () => {
  fetchUserExcel().then((data) => {
    data.forEach(function (element) {
      element.Дата_рождения = dateParse(element.Дата_рождения);
    });

    if (data) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "User");
      XLSX.writeFile(wb, "UserExcel.xlsx");
    }
  });
};

export const getOrderDataExcel = (complete) => {
  fetchOrderExcel({ complete: complete }).then((data) => {
    var all_data = [];
    data.rows.forEach(function (element) {
      var this_obj = {};
      this_obj = { ...element };

      element.order_products.forEach(function (in_obj) {
        let temp_obj = {};
        temp_obj = in_obj;
        this_obj = Object.assign({}, this_obj, { ...temp_obj });
        delete this_obj.order_products;
        all_data.push(this_obj);
      });
    });

    all_data.forEach(function (data) {
      data.Статус_доставки = data.Статус_заказа ? "Завершен" : "В пути";
      data.ФИ_пользователя = data.user.Имя + " " + data.user.Фамилия;
      delete data.user;
      delete data.ID;
      data.Наименование_товара = data.product.Наименование_товара;
      data.Бренд = data.product.brand.name;
      data.Тип = data.product.type.name;
      data.Цена_товара = data.product.Цена_товара;
      data.Количество_товара = data.Количество_товара;
      data.Итоговая_стоимость =
        Number(data.Цена_товара) * Number(data.Количество_товара);
      delete data.Статус_заказа;
      delete data.product;
    });

    if (data && all_data) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(all_data);
      XLSX.utils.book_append_sheet(wb, ws, "Orders");
      XLSX.writeFile(wb, "OrdersExcel.xlsx");
    }
  });
};

export const getRemnantsExcel = () => {
    fetchRemnantsExcel().then((data) => {
      let all_data = [];

      data.rows.forEach((elem) => {
        let dataObj = {};
        dataObj.НаименованиеТовара = elem.product.НаименованиеТовара;
        dataObj.ЦенаТовара = elem.product.ЦенаТовара;
        dataObj.НаименованиеРазмера = elem.size.НаименованиеРазмера;
        dataObj.Количество = elem.Количество;

        all_data.push(dataObj);
      });

      if (data && all_data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(all_data);
        XLSX.utils.book_append_sheet(wb, ws, "Remnants");
        XLSX.writeFile(wb, "RemnantsExcel.xlsx");
      }
    });
  };
