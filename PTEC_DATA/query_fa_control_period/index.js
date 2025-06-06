'use strict';

const period_login = async (res) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const dateLogin = await pool.request()
      .input('BranchID', sql.Int, res.BranchID)
      .input('RoundID', sql.Int, res.RoundID ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_Time_Login @BranchID, @RoundID`);
    //sql.close()
    return dateLogin.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_check_periodForUpdate = async (check_periodForUpdate) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const dateLogin = await pool.request()
      .input('PeriodID', sql.BigInt, check_periodForUpdate.PeriodID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_check_periodForUpdate @PeriodID`);
    //sql.close()
    return dateLogin.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getsperiod_round = async (selectQuery) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const allround_period = await pool.request()
      .input('BranchID', sql.Int, selectQuery.BranchID)
      .input('depCode', sql.NVarChar, selectQuery.depCode ?? null)
      .input('personID', sql.NVarChar, selectQuery.personID ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_all_rounds @BranchID, @depCode, @personID`);
    //sql.close()
    return allround_period.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const fa_permission_branch = async (permission_branch) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fa_permission_branch = await pool.request()
      .input('userCode', sql.VarChar(10), permission_branch.userCode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Permission_Branch @userCode`);
    //sql.close()
    return fa_permission_branch.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const craete_period = async (res) => {
  console.log(res);
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fa_create_period = await pool.request()
      .input('begindate', sql.DateTime, res.begindate)
      .input('enddate', sql.DateTime, res.enddate)
      .input('branchid', sql.VarChar(200), res.branchid)
      .input('description', sql.NVarChar(100), res.description)
      .input('usercode', sql.VarChar(10), res.usercode)
      .input('depcode', sql.VarChar(200), res.depcode ?? null)
      .input('personID', sql.VarChar(200), res.personID ?? null)
      .input('keyID', sql.VarChar(100), res.keyID ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[FA_Create_Assets_Counted_After_Period] @begindate ,@enddate ,@branchid ,@description ,@usercode, @depcode, @personID, @keyID`);
    //sql.close()
    return fa_create_period.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const delete_period = async (fa_delete_period) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fa_delete_period_data = await pool.request()
      .input('PeriodID', sql.BigInt, fa_delete_period.PeriodID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Controls_Delete_Period @periodID`);
    //sql.close()
    return fa_delete_period_data.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const update_period = async (res) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fa_update_period_data = await pool.request()
      .input('PeriodID', sql.BigInt, res.PeriodID)
      .input('BeginDate', sql.DateTime, res.BeginDate)
      .input('EndDate', sql.DateTime, res.EndDate)
      .input('BranchID', sql.Int, res.BranchID)
      .input('Description', sql.NVarChar(100), res.Description)
      .input('usercode', sql.VarChar(10), res.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_update_period @BranchID, @BeginDate, @EndDate, @Description, @usercode, @PeriodID`);
    //sql.close()
    return fa_update_period_data.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const check_assets_in_period = async (check_assets_in_period) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const check_assets_in_period_data = await pool.request()
      .input('PeriodID', sql.BigInt, check_assets_in_period.PeriodID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_check_assets_in_period @PeriodID`);
    //sql.close()
    return check_assets_in_period_data.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const check_BranchID = async (check_BranchID_in_period) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const check_Branch_data = await pool.request()
      .input('BranchID', sql.BigInt, check_BranchID_in_period.BranchID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_check_branch @BranchID`);
    //sql.close()
    return check_Branch_data.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const select_priod = async (call_period) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const check_Branch_data = await pool.request()
      .input('usercode', sql.VarChar(10), call_period.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.select_callPeriod @usercode`);
    //sql.close()
    return check_Branch_data.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_Fetch_Branch_Period = async (branch_period) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const auto_DeapartMent = await pool.request()
      .input('usercode', sql.VarChar(10), branch_period.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Fetch_Branch_Period @usercode`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const round_website = async (selectQuery) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const allround_period = await pool.request()
      .input('BranchID', sql.Int, selectQuery.BranchID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Permission_Website @BranchID`);
    //sql.close()
    return allround_period.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Period_GroupBy = async (selectQuery) => {
  const sql = require('mssql');
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const allround_period = await pool.request()
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Period_GroupBy`);
    //sql.close()
    return allround_period.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

module.exports = {
  period_login,
  getsperiod_round,
  fa_permission_branch,
  craete_period,
  update_period,
  check_assets_in_period,
  delete_period,
  check_BranchID,
  select_priod,
  store_check_periodForUpdate,
  round_website,
  FA_Period_GroupBy,
  FA_Control_Fetch_Branch_Period
}