<?php

namespace App\Http\Controllers;

use App\Spend;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class SpendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $spends = DB::table('spends')
            ->join('spends_types', 'spends.spend_type_id', '=', 'spends_types.id')
            ->get();
        // return Spend::all()
        //     ->join('spends_types', 'spends.spend_type_id', '=', 'spends_types.id');
        return $spends;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $spend = new Spend;
        $spend->spend_type_id = $request->spend_type_id;
        $spend->value = $request->value;
        $spend->note = $request->note;
        $spend->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Spend  $spend
     * @return \Illuminate\Http\Response
     */
    public function show(Spend $spend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Spend  $spend
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $spend = Spend::find($id);
        $spend->spend_type_id = $request->spend_type_id;
        $spend->value = $request->value;
        $spend->note = $request->note;
        $spend->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Spend  $spend
     * @return \Illuminate\Http\Response
     */
    public function destroy(Spend $spend)
    {
        //
    }
}
