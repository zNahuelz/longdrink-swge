<?php

namespace App\Http\Controllers;

use App\Models\Resources;
use Illuminate\Http\Request;

class ResourcesController extends Controller
{
    public function listResources()
    {
        $resources = Resources::select('id','name','description','mime_type','created_at')->paginate(10);
        return response()->json($resources);
    }
    
    public function uploadResource(Request $request)
    {
        $request->validate([
            'description' => ['required','max:100'],
            'document' => ['required','file','mimes:pdf,doc,docx,pptx'],
        ]);

        $file = $request->file('document');
        $resource = Resources::create([
            'name' => $file->getClientOriginalName(),
            'description' => $request->description,
            'document' => file_get_contents($file),
            'mime_type' => $file->getMimeType(),
        ]);
        return response()->json(['message' => 'Documento guardado correctamente como: '.$resource->name],201);
    }

    public function downloadResource($id)
    {
        $resource = Resources::find($id);
        if($resource)
        {
            return response($resource->document)
            ->header('Content-Type',$resource->mime_type)
            ->header('Content-Disposition','attachment; filename ='.$resource->name.'"');
        }
        else
        {
            return response()->json([
                'message' => 'Archivo de ID: '.$id.' no encontrado.'
            ],404);
        }
    }

}
