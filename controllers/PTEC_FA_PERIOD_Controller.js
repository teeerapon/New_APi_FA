'use strict';

const query_fa_control_period = require('../PTEC_DATA/query_fa_control_period');

const period_login = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const period_loginDateTrue = await query_fa_control_period.period_login(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (period_loginDateTrue.length == 0) {
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "ไม่พบการเปิดช่วงเวลานี้" }));
    } else {
      res.status(200).send(JSON.stringify({
        message: "success",
        PeriodRound: period_loginDateTrue[0].PeriodID,
        PeriodName: period_loginDateTrue[0].Description,
        personID: period_loginDateTrue[0].personID,
        BranchID: period_loginDateTrue[0].BranchID,
        DepCode: period_loginDateTrue[0].DepCode
      }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getAllround_period = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const all_period = await query_fa_control_period.getsperiod_round(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const permission_branch = async (req, res, next) => {
  try {
    const permission_branch = req.body;
    const period_login_permission_branch = await query_fa_control_period.fa_permission_branch(permission_branch);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (period_login_permission_branch.length == 0) {
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "ไม่พบสิทธิ์" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: period_login_permission_branch }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const craete_period = async (req, res, next) => {
  try {
    const craete_period = req.body;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const craete_period_branch = await query_fa_control_period.craete_period(craete_period);
    console.log(req.body);
    if(craete_period_branch.length > 0){
      res.status(200).send(JSON.stringify({ message: "success", data: craete_period_branch }));
    }else{
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "เพิ่มข้อมูลไม่สำเร็จ" }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const update_period = async (req, res, next) => {
  try {
    const craete_period = req.body;
    console.log(craete_period);
    const response = await query_fa_control_period.update_period(craete_period)
    res.status(200).send(JSON.stringify({ message: "ทำการแก้ไขข้อมูลรอบตรวจนับที่ " + craete_period.Description + ' เสร็จสิ้น' }));
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const delete_period = async (req, res, next) => {
  try {
    const delete_period = req.body;
    const check_assets_in_period = await query_fa_control_period.check_assets_in_period(delete_period)
    if (check_assets_in_period.length != 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่สามารถลบได้ เนื่องจากมีการตรวจนับทรัพย์สิน" }));
    }
    else {
      await query_fa_control_period.delete_period(delete_period)
      res.status(200).send(JSON.stringify({ message: "ทำการลบข้อมูลรอบตรวจนับที่ " + delete_period.PeriodID + ' เสร็จสิ้น' }));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const select_priod = async (req, res, next) => {
  try {
    const data = req.body;
    const call_period = await query_fa_control_period.select_priod(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (call_period.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: call_period }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const round_website = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const all_period = await query_fa_control_period.round_website(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const FA_Period_GroupBy = async (req, res, next) => {
  try {
    const all_period = await query_fa_control_period.FA_Period_GroupBy();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const FA_Control_Fetch_Branch_Period = async (req, res, next) => {
  try {
    const data = req.body;
    const branch_period = await query_fa_control_period.FA_Control_Fetch_Branch_Period(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (branch_period.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: branch_period }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}


module.exports = {
  period_login,
  getAllround_period,
  permission_branch,
  craete_period,
  update_period,
  delete_period,
  select_priod,
  round_website,
  FA_Period_GroupBy,
  FA_Control_Fetch_Branch_Period
}