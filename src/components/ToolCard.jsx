import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ToolCard = ({ tool, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="tool-card h-full bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {tool.name.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">{tool.name}</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < tool.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({tool.rating}/5)</span>
                </div>
              </div>
            </div>
            <Badge variant={tool.type === 'Gratuit' ? 'secondary' : 'default'} className="text-xs">
              {tool.type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="text-gray-600 mb-4 line-clamp-3">
            {tool.description}
          </CardDescription>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.features.map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Niveau:</span> {tool.level}
            </div>
            <Button
              onClick={() => window.open(tool.url, '_blank')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Visiter
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolCard;