<?php
global $_GPC, $_W;
$storeid=$_COOKIE["storeid"]; 
$cur_store = $this->getStoreById($storeid);
// $system=pdo_get('wpdc_system',array('uniacid'=>$_W['uniacid']));
// $time=time()-($system['day']*24*60*60);
// pdo_update('wpdc_order',array('state'=>4),array('state'=>3,'time <='=>$time));
$GLOBALS['frames'] = $this->getNaveMenu();
$pageindex = max(1, intval($_GPC['page']));
$pagesize=8;
$type=isset($_GPC['type'])?$_GPC['type']:'now';
$where=" where uniacid=:uniacid and store_id=".$storeid;
$data[':uniacid']=$_W['uniacid']; 
if(isset($_GPC['keywords'])){
    $where.=" and (user_name LIKE  concat('%', :name,'%') || order_num LIKE  concat('%', :name,'%'))";
    $data[':name']=$_GPC['keywords']; 
    $type='all';  
}
if($_GPC['time']){
    $start=strtotime($_GPC['time']['start']);
    $end=strtotime($_GPC['time']['end']);
    $where.=" and UNIX_TIMESTAMP(time) >={$start} and UNIX_TIMESTAMP(time) <={$end}";
    $type='all';
}else{
 if($type=='wait'){
    $where.=" and state=1";
}
if($type=='now'){
    $where.=" and state=2";
}
if($type=='cancel'){
    $where.=" and state in (6,7,8)";
}
if($type=='complete'){
    $where.=" and state in (4,5)";
}
if($type=='delivery'){
    $where.=" and state=3";
}
if($type=='zt'){
    $where.=" and is_zt=1";
} 
}



$sql="SELECT * FROM ".tablename('zhvip_shoporder'). "  ".$where." ORDER BY time DESC";

$total=pdo_fetchcolumn("SELECT count(*) FROM ".tablename('zhvip_shoporder'). "  ".$where." ORDER BY time DESC",$data);
$select_sql =$sql." LIMIT " .($pageindex - 1) * $pagesize.",".$pagesize;
$pager = pagination($total, $pageindex, $pagesize);
$list=pdo_fetchall($select_sql,$data);

 $res2=pdo_getall('zhvip_ordergoods');
  $data3=array();
  for($i=0;$i<count($list);$i++){
    $data4=array();
    for($k=0;$k<count($res2);$k++){
      if($list[$i]['id']==$res2[$k]['order_id']){
        $data4[]=array(
          'name'=>$res2[$k]['name'],
          'num'=>$res2[$k]['number'],
          'img'=>$res2[$k]['img'],
          'money'=>$res2[$k]['money'],
          'spec'=>$res2[$k]['spec'],
          'good_id'=>$res2[$k]['good_id']
          );
      }
    }
    $data3[]=array(
      'order'=> $list[$i],
      'goods'=>$data4
      );
  }
//print_r($data3);die;
$time=date("Y-m-d");
$time2=date("Y-m-d",strtotime("-1 day"));
$time="'%$time%'";
$time2="'%$time2%'";

$wx = "select sum(money) as total from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."  and state  in (4,5,8) and pay_type=1 and store_id=".$storeid;
$wx = pdo_fetch($wx);//今天的微信外卖销售额
$yue = "select sum(money) as total from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."  and state  in (4,5,8) and pay_type=2 and store_id=".$storeid;
$yue = pdo_fetch($yue);//今天的余额外卖销售额
$jf = "select sum(money) as total from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."  and state  in (4,5,8) and pay_type=3 and store_id=".$storeid;
$jf = pdo_fetch($jf);//今天的积分外卖销售额

$ztwx = "select sum(money) as total from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."  and state  in (4,5,8) and pay_type=1 and store_id=".$storeid;
$ztwx = pdo_fetch($ztwx);//昨天的微信外卖销售额
$ztyue = "select sum(money) as total from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."  and state  in (4,5,8) and pay_type=2 and store_id=".$storeid;
$ztyue = pdo_fetch($ztyue);//昨天的余额外卖销售额
$ztjf = "select sum(money) as total from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."  and state  in (4,5,8) and pay_type=3 and store_id=".$storeid;
$ztjf = pdo_fetch($ztjf);//昨天的积分外卖销售额






$wm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."   and state  in (4,5,8) and uniacid=".$_W['uniacid'] ." and store_id=".$storeid;
$wm2 = count(pdo_fetchall($wm2));//今天外卖订单量
$wxwm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."   and state  in (4,5,8) and pay_type=1 and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$wxwm2 = count(pdo_fetchall($wxwm2));//今天外卖微信订单量
$yuewm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."   and state  in (4,5,8) and pay_type=2 and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$yuewm2 = count(pdo_fetchall($yuewm2));//今天外卖余额订单量
$jfwm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time."   and state  in (4,5,8) and pay_type=3 and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$jfwm2 = count(pdo_fetchall($jfwm2));//今天外卖积分订单量




$ztwm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."   and state  in (4,5,8) and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$ztwm2 = count(pdo_fetchall($ztwm2));//昨天外卖订单量
$ztwxwm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."   and state  in (4,5,8) and pay_type=1 and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$ztwxwm2 = count(pdo_fetchall($ztwxwm2));//昨天外卖微信订单量
$ztyuewm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."   and state  in (4,5,8) and pay_type=2 and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$ztyuewm2 = count(pdo_fetchall($ztyuewm2));//昨天外卖余额订单量
$ztjfwm2 = "select * from " . tablename("zhvip_shoporder")." WHERE time LIKE ".$time2."   and state  in (4,5,8) and pay_type=3 and uniacid=".$_W['uniacid']." and store_id=".$storeid;
$ztjfwm2 = count(pdo_fetchall($ztjfwm2));//昨天外卖积分订单量








if(checksubmit('submit3')){
    $res=pdo_update('zhvip_shoporder',array('state'=>3,'kd_num'=>$_GPC['reply'],'kd_name'=>$_GPC['reply2']),array('id'=>$_GPC['fh_id']));
    if($res){
      //////模板消息///////
        function getaccess_token($_W){
        $res=pdo_get('zhvip_system',array('uniacid'=>$_W['uniacid']));
        $appid=$res['appid'];
        $secret=$res['appsecret'];
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$secret."";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,0);
        $data = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($data,true);
        return $data['access_token'];
    }
//设置与发送模板信息
    function set_msg($_W){
        $access_token = getaccess_token($_W);
        $res=pdo_get('zhvip_system',array('uniacid'=>$_W['uniacid']));
        $order=pdo_get('zhvip_shoporder',array('id'=>$_POST['fh_id']));
        $store=pdo_get('zhvip_store',array('id'=>$order['store_id']));
        $user=pdo_get('zhvip_user',array('id'=>$order['user_id']));
        $formwork ='{
            "touser": "'.$user["openid"].'",
            "template_id": "'.$res["tid4"].'",
            "page": "zh_vip/pages/index/index",
            "form_id":"'.$order['form_id2'].'",
            "data": {
                "keyword1": {
                    "value": "'.$order['order_num'].'",
                    "color": "#173177"
                },
                "keyword2": {
                    "value":"'.$store['name'].'",
                    "color": "#173177"
                },
                "keyword3": {
                    "value": "'.$order['money'].'",
                    "color": "#173177"
                },
                "keyword4": {
                    "value": "'.$order['kd_name'].'",
                    "color": "#173177"
                },
                "keyword5": {
                    "value": "'.$order['kd_num'].'",
                    "color": "#173177"
                },
                "keyword6": {
                    "value": "'.$order['address'].'",
                    "color": "#173177"
                },
                "keyword7": {
                    "value": "'.date("Y-m-d H:i:s").'",
                    "color": "#173177"
                }
            }  
        }';
             // $formwork=$data;
        $url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=".$access_token."";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,0);
        curl_setopt($ch, CURLOPT_POST,1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$formwork);
        $data = curl_exec($ch);
        curl_close($ch);
       // return $data;
    }
    echo set_msg($_W);


        ////////模板消息//////
        message('发货成功！', $this->createWebUrl2('dlmallorder'), 'success');
    }else{
        message('发货失败！','','error');
    }
}
if($_GPC['op']=='wc'){
    $data2['state']=4;
    $data2['complete_time']=date("Y-m-d H:i:s");
    $order=pdo_get('zhvip_shoporder',array('id'=>$_GPC['id']));
    $res=pdo_update('zhvip_shoporder',$data2,array('id'=>$_GPC['id']));
    if($res){
        ///////////加积分//////////////
         $system=pdo_get('zhvip_system',array('uniacid'=>$order['uniacid']));
         if($system['is_jf']==1){
             $jifen=round(($system['integral']/100)*$order['money']);
             pdo_update('zhvip_user',array('integral +='=>$jifen),array('id'=>$order['user_id']));
            $data5['score']=$jifen;
            $data5['user_id']=$order['user_id'];
            $data5['note']='商城订单';
            $data5['type']=1;
            $data5['cerated_time']=date('Y-m-d H:i:s');
            $data5['uniacid']=$order['uniacid'];//小程序id
            pdo_insert('zhvip_jfmx',$data5);
         }
        ///////////加积分//////////////
         //////////升级//////////////
         pdo_update('zhvip_user',array('cumulative +='=>$order['money'],'level_cumulative +='=>$order['money']),array('id'=>$order['user_id']));
        $user=pdo_get('zhvip_user',array('id'=>$order['user_id']));
        $dj=pdo_get('zhvip_level',array('id'=>$user['grade']));
        $level=pdo_getall('zhvip_level',array('uniacid'=>$_W['uniacid'],'level >'=>$dj['level']),array(),'','level asc');
        if($level){
            $money=$user['level_cumulative'];
            for($i=0;$i<count($level);$i++){
                if(($money-$level[$i]['threshold'])>=0){
                    $money=$money-$level[$i]['threshold'];
                    pdo_update('zhvip_user',array('grade'=>$level[$i]['id'],'level_cumulative'=>$money),array('id'=>$order['user_id'])); 
                }else{
                 break;
             }
         }
     }
     //////////升级//////////////
        message('完成成功！', $this->createWebUrl2('dlmallorder'), 'success');
    }else{
        message('完成失败！','','error');
    }

}






    if($_GPC['op']=='delete'){
    $res=pdo_delete('zhvip_shoporder',array('id'=>$_GPC['id']));
    if($res){
         message('删除成功！', $this->createWebUrl2('dlmallorder'), 'success');
        }else{
              message('删除失败！','','error');
        }
}

 if($_GPC['op']=='tg'){
        $id=$_GPC['id'];
        include_once IA_ROOT . '/addons/zh_vip/cert/WxPay.Api.php';
        load()->model('account');
        load()->func('communication');
        $WxPayApi = new WxPayApi();
        $input = new WxPayRefund();
       //$path_cert = IA_ROOT . '/addons/zh_vip/cert/apiclient_cert.pem';
       // $path_key = IA_ROOT . '/addons/zh_vip/cert/apiclient_key.pem';
        $path_cert = IA_ROOT . "/addons/zh_vip/cert/".'apiclient_cert_' . $_W['uniacid'] . '.pem';
        $path_key = IA_ROOT . "/addons/zh_vip/cert/".'apiclient_key_' . $_W['uniacid'] . '.pem';
        $account_info = $_W['account'];
        $refund_order =pdo_get('zhvip_shoporder',array('id'=>$id));  
        $res=pdo_get('zhvip_system',array('uniacid'=>$_W['uniacid']));
        $appid=$res['appid'];
        $key=$res['wxkey'];
        $mchid=$res['mchid']; 
        //print_r( $refund_order );die;
        $out_trade_no=$refund_order['code'];//商户订单号
        $fee = $refund_order['money'] * 100;
            //$refundid = $refund_order['transid'];
            //$refundid='4200000022201710178579320894';
            $input->SetAppid($appid);
            $input->SetMch_id($mchid);
            $input->SetOp_user_id($mchid);
            $input->SetRefund_fee($fee);
            $input->SetTotal_fee($fee);
           // $input->SetTransaction_id($refundid);
            $input->SetOut_refund_no($refund_order['order_num']);
            $input->SetOut_trade_no($out_trade_no);
            $result = $WxPayApi->refund($input, 6, $path_cert, $path_key, $key);
           
     //var_dump($result);die;
            if ($result['result_code'] == 'SUCCESS') {//退款成功
           pdo_update('zhvip_shoporder',array('state'=>7),array('id'=>$id));
           message('退款成功',$this->createWebUrl2('dlmallorder',array()),'success');
         
    }else{
        message($result['err_code_des'],'','error');
}
}

if($_GPC['op']=='jj'){
    $res=pdo_update('zhvip_shoporder',array('state'=>8),array('id'=>$_GPC['id']));
    if($res){
        message('拒绝退款成功',$this->createWebUrl2('dlmallorder',array()),'success');
    }else{
       message('拒绝退款失败','','error');
    }
}
include $this->template('web/dlmallorder');