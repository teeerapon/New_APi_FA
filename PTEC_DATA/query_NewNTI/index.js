"use strict";

const NewNTI_Station_InPut = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');

  let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
  const addOwner = await pool
    .request()
    .input("Name", sql.NVarChar(255), req.Name)
    .input("Tell", sql.NVarChar(15), req.Tell)
    .input("Email", sql.VarChar(30), req.Email)
    .input("Latitude", sql.VarChar(100), req.Latitude)
    .input("Longitude", sql.VarChar(100), req.Longitude)
    .input("Remark", sql.NVarChar(255), req.Remark)
    .input("Area_width", sql.Float, req.Area_width)
    .input("Area_total", sql.Float, req.Area_total)
    .input("NumberArea", sql.NVarChar(255), req.NumberArea)
    .input("Owner_Name", sql.NVarChar(50), req.Owner_Name)
    .input("Owner_Tell", sql.NVarChar(50), req.Owner_Tell)
    .input("Owner_Type", sql.NVarChar(100), req.Owner_Type)
    .input("Area_Type", sql.NVarChar(100), req.Area_Type)
    .input("Tambol", sql.NVarChar(100), req.Tambol)
    .input("District", sql.NVarChar(100), req.District)
    .input("Province", sql.NVarChar(100), req.Province)
    .input("Postcode", sql.NVarChar(100), req.Postcode)
    .input("OfferType", sql.NVarChar(255), req.OfferType)
    .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.NewNTI_Station_InPut @Name,@Tell,@Email,@Latitude,@Longitude,@Remark,@Area_width,@Area_total,@NumberArea,@Owner_Name,@Owner_Tell,@Owner_Type,@Area_Type,@Tambol,@District,@Province,@Postcode,@OfferType`);

  //sql.close()
  return addOwner.recordset;
};

const Districts_List = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
  //const sqlOueries = await utils.loadSqlOueries("TEST_OPS");
  const addOwner = await pool.request().query(`exec [PTEC_USERSRIGHT].dbo.Districts_List`);

  //sql.close()
  return addOwner.recordset;
};

const Amphures_List = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
  //const sqlOueries = await utils.loadSqlOueries("TEST_OPS");
  const addOwner = await pool.request().query(`exec [PTEC_USERSRIGHT].dbo.Amphures_List`);

  //sql.close()
  return addOwner.recordset;
};

const Provinces_List = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
  //const sqlOueries = await utils.loadSqlOueries("TEST_OPS");
  const addOwner = await pool.request().query(`exec [PTEC_USERSRIGHT].dbo.Provinces_List`);
  //sql.close()
  return addOwner.recordset;
};


module.exports = {
  NewNTI_Station_InPut,
  Districts_List,
  Amphures_List,
  Provinces_List
};